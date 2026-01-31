import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const BLOG_CONTENT_DIR = path.resolve('src/content/blog');
const LINKEDIN_OUTPUT_DIR = path.resolve('linkedin');
const SITE_URL = 'https://vanmahajan.de';

// Ensure output directory exists
if (!fs.existsSync(LINKEDIN_OUTPUT_DIR)) {
    fs.mkdirSync(LINKEDIN_OUTPUT_DIR, { recursive: true });
}

async function generateLinkedInContent() {
    console.log('🚀 Starting LinkedIn content generation...');

    const posts = getAllPosts(BLOG_CONTENT_DIR);
    let generatedCount = 0;

    for (const postPath of posts) {
        const relativePath = path.relative(BLOG_CONTENT_DIR, postPath);
        const slug = relativePath.replace(/\.md$/, '');
        const fileContent = fs.readFileSync(postPath, 'utf-8');
        const { data: frontmatter, content: markdown } = matter(fileContent);

        if (!frontmatter.linkedin) {
            continue;
        }

        console.log(`\n📄 Processing: ${relativePath}`);
        const outputDir = path.join(LINKEDIN_OUTPUT_DIR, slug);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // 1. Transform URLs to absolute
        const absoluteMarkdown = transformUrls(markdown, slug);

        // 2. Generate HTML Article
        const htmlArticle = generateHtmlArticle(frontmatter, absoluteMarkdown, slug);
        fs.writeFileSync(path.join(outputDir, 'article.html'), htmlArticle);

        // 3. Generate Rich Text Article (stripped of most HTML)
        const richTextArticle = generateRichTextArticle(frontmatter, absoluteMarkdown);
        fs.writeFileSync(path.join(outputDir, 'article.txt'), richTextArticle);

        // 4. Generate LinkedIn Post
        const postText = generatePostText(frontmatter, slug);
        fs.writeFileSync(path.join(outputDir, 'post.txt'), postText);

        // 5. Generate Update Summary if applicable
        if (frontmatter.linkedinArticleUrl) {
            const updateSummary = generateUpdateSummary(frontmatter, absoluteMarkdown);
            fs.writeFileSync(path.join(outputDir, 'update-summary.txt'), updateSummary);
        }

        generatedCount++;
    }

    console.log(`\n✅ Finished! Generated LinkedIn content for ${generatedCount} posts.`);
}

function getAllPosts(dirPath, arrayOfFiles = []) {
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
    // For LinkedIn's visual editor, we want something fairly clean but with some formatting
    let text = `# ${frontmatter.title}\n\n`;
    text += `Originally published at ${SITE_URL}\n\n`;
    text += `---\n\n`;
    text += markdown;

    // In a real scenario, we might want to convert markdown to a semi-rich format 
    // but for article.txt we'll provide the clean markdown which LinkedIn often handles well
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
