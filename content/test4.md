---
title: "Using Markdown with Syntax Highlighting"
date: "2025-03-01"
description: "Learn how to use syntax highlighting in Next.js"
tags: [ "Next.js", "markdown", "prismjs" ]
---

## Using Code Blocks in Markdown

### Autoloading modules

While developing the project up until this point, I've used Node.js and its REPL to interact with the objects. However,
I've found it cumbersome to require all the modules manually. This concern will only get more significant as the project
grows.

```javascript
import { readdir } from 'node:fs/promises';

import settings from '#src/config/settings.js';

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

const autoload = async () => {
  const moduleMap = new Map();

  for (const path of settings.loader.modules) {
    // Read each directory (this requires a path relative to the project root)
    const moduleFiles = await readdir(path.replace(/^#/, './'));

    for (const moduleFile of moduleFiles) {
      // Convert the file name to a module name (e.g., post.js -> Post)
      const moduleName = capitalize(moduleFile.split('.')[0]);

      if (!moduleMap.has(moduleName)) {
        // Dynamically import the module and add it to the map
        const module = await import(`${path}/${moduleFile}`);
        moduleMap.set(moduleName, module.default);
      } else throw new Error(`Duplicate class name: ${moduleName}`);
    }
  }

  // Convert the map to an object and return it, so that it can be exported
  return Object.fromEntries(moduleMap.entries());
};

const modules = await autoload();

export default { ...modules, settings };
```

![Sample Image](https://plus.unsplash.com/premium_photo-1734543942836-3f9a0c313da4?q=80&w=2133&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)