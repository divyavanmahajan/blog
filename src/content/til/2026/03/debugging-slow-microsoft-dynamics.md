---
title: "Debugging Slow Microsoft Dynamics Sites"
description: "A structured workflow for identifying and resolving performance bottlenecks in Microsoft Dynamics 365 environments."
pubDate: 2026-03-10
tags: ["dynamics-365", "performance", "debugging", "dataverse", "javascript"]
draft: false
---

Today I learned a systematic approach to debugging slow-loading Microsoft Dynamics 365 sites by isolating bottlenecks across the client, network, and platform layers.

## The Problem

Debugging a slow-loading Microsoft Dynamics site requires isolating whether the bottleneck is client-side, network, platform configuration, customizations, or backend services. Without a structured approach, engineers often rely on guesswork, which leads to inefficient troubleshooting and unresolved performance issues.

## The Solution

By following a structured 12-step debugging workflow, you can narrow down the layer where the slowness occurs and apply targeted fixes.

### 1. Identify Where the Slowness Occurs
Determine what exactly is slow:
* Entire site loads slowly
* Specific form or dashboard slow
* Slow record save
* Slow search or view loading
* Slow plugins/workflows

Ask if it happens for all users or specific users, if it's one page or all pages, and if it's time-based (peak hours).

### 2. Check Browser Performance (Client Side)
Use browser DevTools (Network + Performance tab) to look for:
* Large JS bundles
* Long API calls
* Slow images/resources
* Blocked scripts

For repeated automated analysis, you can capture and analyze network traffic using CLI tools:
* Use `uvx har-capture` to record a HTTP Archive (HAR) file of the session.(see https://pypi.org/project/har-capture/)
* Use `uvx dvm-haranalyzer` to analyze the generated HAR file for specific Dynamics bottlenecks. (see https://pypi.org/project/dvm-haranalyzer/)

Dynamics forms often slow down due to custom JS on OnLoad events.

### 3. Review Dynamics Form Load Performance
In Dynamics 365, use Settings -> Performance tools or append `&perf=true` to the URL. This shows:
* Form load breakdown
* Script execution time
* Data load time

### 4. Investigate Customizations
Heavy customization is the primary reason Dynamics gets slow. Check Plugin Trace Logs for synchronous plugins or long-running logic. Use Microsoft Power Automate to check for heavy flows triggered on update.

### 5. Check Network Latency
Look for slow calls to `/api/data/v9.0/` in the DevTools network tab. Measure TTFB (time to first byte) and total request time.

### 6. Analyze Dataverse Query Performance
Check for views with many columns, filters using non-indexed fields, and complex joins in FetchXML queries or dashboards.

### 7. Check Large Tables / Data Volume
Performance drops if tables exceed millions of records. Review audit logs and custom entities, and consider archiving data or optimizing indexes.

### 8. Test Without Custom Scripts
Disable JS libraries, form scripts, and PCF controls to compare performance. If speed improves, customization is the cause.

### 9. Check Microsoft Service Health
Check the Microsoft 365 Admin Center for service incidents or regional outages.

### 10. Review PCF Controls
Custom components using Power Apps Component Framework can cause heavy rendering or memory leaks. Profile them separately.

### 11. Monitor With Application Insights
Integrate Azure Application Insights for full telemetry on API calls and plugin execution.

### 12. Typical Root Causes
* Synchronous plugins calling external APIs
* Heavy form JavaScript
* Large subgrids
* Inefficient FetchXML queries
* Too many flows triggered on update
* Large datasets without archiving
* Slow PCF controls

## Summary Workflow

1. Check browser network tab
2. Check form performance (`&perf=true`)
3. Check Plugin Trace Logs
4. Disable custom scripts
5. Analyze Dataverse queries
6. Review flows and plugins

## Why This Matters

A structured debugging flow reduces downtime and ensures that performance optimizations are applied to the actual root cause rather than symptoms. Always start debugging in incognito mode with no extensions to rule out browser interference.
