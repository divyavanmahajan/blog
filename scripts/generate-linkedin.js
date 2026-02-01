import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const BLOG_CONTENT_DIR = path.resolve('src/content/blog');
const TIL_CONTENT_DIR = path.resolve('src/content/til');
const LINKEDIN_OUTPUT_DIR = path.resolve('linkedin');
const SITE_URL = 'https://vanmahajan.de';
const TIL_SITE_URL = 'https://www.wanmahajan.de';

// Parse CLI arguments
const args = process.argv.slice(2);
const periodArg = args.find(arg => arg.startsWith('--period='));
const period = periodArg ? periodArg.split('=')[1] : 'month'; // 'month' or 'week'

// Ensure output directories exist
[
    LINKEDIN_OUTPUT_DIR,
    path.join(LINKEDIN_OUTPUT_DIR, 'til', 'monthly'),
    path.join(LINKEDIN_OUTPUT_DIR, 'til', 'week')
].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

async function generateLinkedInContent() {
    console.log('🚀 Starting LinkedIn content generation...');
    console.log(`📅 TIL Period: ${period}`);

    // 1. Process Blog Posts
    const blogPosts = getAllPosts(BLOG_CONTENT_DIR);
    let blogCount = 0;

    for (const postPath of blogPosts) {
        const relativePath = path.relative(BLOG_CONTENT_DIR, postPath);
        const slug = relativePath.replace(/\.md$/, '');
        const fileContent = fs.readFileSync(postPath, 'utf-8');
        const { data: frontmatter, content: markdown } = matter(fileContent);

        if (!frontmatter.linkedin) {
            continue;
        }

        console.log(`📄 Processing Blog: ${relativePath}`);
        const outputDir = path.join(LINKEDIN_OUTPUT_DIR, slug);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const absoluteMarkdown = transformUrls(markdown, slug);
        const htmlArticle = generateHtmlArticle(frontmatter, absoluteMarkdown, slug);
        fs.writeFileSync(path.join(outputDir, 'article.html'), htmlArticle);

        const richTextArticle = generateRichTextArticle(frontmatter, absoluteMarkdown);
        fs.writeFileSync(path.join(outputDir, 'article.txt'), richTextArticle);

        const postText = generatePostText(frontmatter, slug);
        fs.writeFileSync(path.join(outputDir, 'post.txt'), postText);

        if (frontmatter.linkedinArticleUrl) {
            const updateSummary = generateUpdateSummary(frontmatter, absoluteMarkdown);
            fs.writeFileSync(path.join(outputDir, 'update-summary.txt'), updateSummary);
        }

        blogCount++;
    }

    // 2. Process TIL Posts and generate summaries
    const tilPosts = getAllPosts(TIL_CONTENT_DIR);
    const groupedTILs = groupTILs(tilPosts, period);
    let tilSummaryCount = 0;

    for (const [key, tils] of Object.entries(groupedTILs)) {
        const summaryText = generateTILSummary(key, tils, period);
        let fileName;
        let subDir;

        if (period === 'month') {
            fileName = `post-${key}.txt`;
            subDir = 'monthly';
        } else {
            fileName = `post-${key}.txt`;
            subDir = 'week';
        }

        const outputPath = path.join(LINKEDIN_OUTPUT_DIR, 'til', subDir, fileName);
        fs.writeFileSync(outputPath, summaryText);
        tilSummaryCount++;
        console.log(`📝 Generated TIL Summary: til/${subDir}/${fileName}`);
    }

    console.log(`\n✅ Finished!`);
    console.log(`- Blog posts processed: ${blogCount}`);
    console.log(`- TIL summaries generated: ${tilSummaryCount}`);
}

function getAllPosts(dirPath, arrayOfFiles = []) {
    if (!fs.existsSync(dirPath)) return arrayOfFiles;
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        if (fs.statSync(filePath).isDirectory()) {
            arrayOfFiles = getAllPosts(filePath, arrayOfFiles);
        } else if (file.endsWith('.md')) {
            arrayOfFiles.push(filePath);
        }
    });

    return arrayOfFiles;
}

function groupTILs(tilPaths, period) {
    const groups = {};

    tilPaths.forEach(tilPath => {
        const fileContent = fs.readFileSync(tilPath, 'utf-8');
        const { data: frontmatter } = matter(fileContent);
        if (!frontmatter.pubDate) return;

        const date = new Date(frontmatter.pubDate);
        let key;

        if (period === 'month') {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            key = `${year}-${month}`;
        } else {
            // Week starting Monday
            const d = new Date(date);
            const day = d.getDay(); // 0 is Sunday, 1 is Monday...
            const diff = d.getDate() - day + (day === 0 ? -6 : 1);
            const monday = new Date(d.setDate(diff));
            const year = monday.getFullYear();
            const month = String(monday.getMonth() + 1).padStart(2, '0');
            const dayNum = String(monday.getDate()).padStart(2, '0');
            key = `${year}-${month}-${dayNum}`;
        }

        if (!groups[key]) groups[key] = [];

        // Get relative path for slug
        const relativePath = path.relative(TIL_CONTENT_DIR, tilPath);
        const slug = relativePath.replace(/\.md$/, '');

        groups[key].push({
            title: frontmatter.title,
            description: frontmatter.description,
            date: frontmatter.pubDate,
            url: `${TIL_SITE_URL}/til/${slug}`
        });
    });

    // Sort tils in each group by date
    for (const key in groups) {
        groups[key].sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    return groups;
}

function generateTILSummary(key, tils, period) {
    let intro;
    if (period === 'month') {
        const [year, month] = key.split('-');
        const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'long' });
        intro = `Here's a summary of what I learned in ${monthName} ${year}:`;
    } else {
        intro = `Here's a summary of what I learned during the week of ${key}:`;
    }

    let summary = `Today I Learned: ${intro}\n\n`;

    tils.forEach(til => {
        const desc = til.description || "";
        const oneSentence = desc.split('.')[0] + (desc.includes('.') ? '.' : '');
        summary += `🚀 ${til.title}\n${oneSentence}\nRead more: ${til.url}\n\n`;
    });

    return summary.trim();
}

function transformUrls(markdown, slug) {
    let content = markdown;

    // Transform images: ![caption](/path) -> ![caption](https://divyavanmahajan.github.io/path)
    content = content.replace(/!\[([^\]]*)\]\((?!http)(\/[^\)]+)\)/g, `![$1](${SITE_URL}$2)`);
    content = content.replace(/!\[([^\]]*)\]\((?!http)(\.\/[^\)]+)\)/g, (match, p1, p2) => {
        const cleanedPath = p2.replace('./', '');
        return `![${p1}](${SITE_URL}/posts/${slug}/${cleanedPath})`;
    });

    // Transform links: [text](/path) -> [text](https://divyavanmahajan.github.io/path)
    content = content.replace(/\[([^\]]*)\]\((?!http)(\/[^\)]+)\)/g, `[$1](${SITE_URL}$2)`);
    content = content.replace(/\[([^\]]*)\]\((?!http)(\.\/[^\)]+)\)/g, (match, p1, p2) => {
        const cleanedPath = p2.replace('./', '');
        return `[${p1}](${SITE_URL}/posts/${slug}/${cleanedPath})`;
    });

    // Transform custom TOC component/placeholder
    content = content.replace(/<TableOfContents\s*\/>/g, '## Table of Contents\n\n[Table of Contents will be generated here in the final LinkedIn article]');

    return content;
}

function generateHtmlArticle(frontmatter, markdown, slug) {
    const htmlBody = marked.parse(markdown);

    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${frontmatter.title}</title>
</head>
<body>
    <h1>${frontmatter.title}</h1>
    <p><em>Originally published at <a href="${SITE_URL}/posts/${slug}">${SITE_URL}</a></em></p>
    <hr>
    ${htmlBody}
</body>
</html>`;
}

function generateRichTextArticle(frontmatter, markdown) {
    let text = `# ${frontmatter.title}\n\n`;
    text += `Originally published at ${SITE_URL}\n\n`;
    text += `---\n\n`;
    text += markdown;
    return text;
}

function generatePostText(frontmatter, slug) {
    const title = frontmatter.title;
    const excerpt = frontmatter.linkedinMessage || frontmatter.description || "Check out my latest blog post!";
    const articleUrl = frontmatter.linkedinArticleUrl || "[PASTE LINKEDIN ARTICLE URL HERE]";

    return `${title}\n\n${excerpt}\n\nRead the full article: ${articleUrl}`;
}

function generateUpdateSummary(frontmatter, markdown) {
    const title = frontmatter.title;
    const articleUrl = frontmatter.linkedinArticleUrl;

    return `📝 Article Update\n\nI've updated my article "${title}" with new content and insights.\n\nRead the updated article: ${articleUrl}`;
}

generateLinkedInContent().catch(err => {
    console.error('❌ Error generating LinkedIn content:', err);
    process.exit(1);
});
