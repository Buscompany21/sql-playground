# SQL Playground Storyline Feature

This document explains how the storyline feature is implemented in the SQL Playground application and how to customize it for your needs.

## Overview

The storyline feature adds narrative context to your SQL learning modules, making the learning experience more engaging and immersive. The implementation follows these principles:

1. **Centralized Configuration**: All storyline content is stored in a single configuration file.
2. **Modular Structure**: Each module has its own storyline content and image.
3. **Consistent UI**: Storyline elements have a consistent UI presentation across the application.
4. **Flexible Integration**: Easy to add, modify, or remove storyline content without affecting the core functionality.

## File Structure

The storyline feature is implemented across these files:

- `src/config/moduleConfig.js` - Contains all storyline data
- `src/components/ModuleStoryline.jsx` - Components for displaying storyline content
- `src/app/module/[moduleId]/ModuleClient.jsx` - Shows full storyline before starting a module
- `src/components/sql-editor.jsx` - Displays storyline context during lessons
- `public/images/storyline/` - Directory for storing storyline images

## How to Customize Storylines

### 1. Update Module Configuration

Edit the `src/config/moduleConfig.js` file to customize storyline content for each module:

```javascript
export const moduleConfig = {
  '1': {
    title: "Module Title",
    description: "Module description",
    levels: 5,
    storyline: {
      text: "Your storyline text goes here. Make it engaging and relevant to the module content.",
      image: "/images/storyline/your-image-name.jpg"
    }
  },
  // Add more modules...
}

// Overall curriculum storyline
export const curriculumStoryline = {
  title: "YOUR CURRICULUM TITLE",
  introduction: "Your overall introduction to the curriculum storyline."
}
```

### 2. Add Storyline Images

1. Prepare square images (recommended size: 600x600px)
2. Save them in the `/public/images/storyline/` directory
3. Name them to match the path in your module configuration (e.g., `module1.png`)

### 3. Add Storyline Content for New Modules

When adding a new module, simply include the `storyline` object with `text` and `image` properties.

### 4. Module Without Storyline

If you want a module without a storyline, simply omit the `storyline` property in the module configuration.

## Components and Their Usage

### ModuleStoryline Component

This component displays the full storyline page when a user first enters a module. It includes:
- Module title
- Curriculum introduction (for the first module)
- Storyline text
- Storyline image
- A button to start the module

### ModuleStorylinePreview Component

This component shows a preview of the module storyline on the homepage, including:
- A thumbnail of the storyline image
- Module title
- First few lines of the storyline text

### StorylineContext Component

This small component appears at the top of each lesson, providing context about which part of the storyline the current lesson belongs to.

## Best Practices

1. **Keep Storylines Concise**: Focus on quality over quantity - make each storyline engaging but brief.
2. **Consistent Tone**: Maintain a consistent voice and tone across all storylines.
3. **Relevant Images**: Choose images that visually reinforce the storyline content.
4. **Progressive Narrative**: Structure storylines to progress logically across modules.
5. **Inclusive Language**: Ensure storylines are accessible and relatable to all learners.

## Troubleshooting

- **Images Not Showing**: Ensure images are in the correct directory and named correctly in the configuration.
- **Styling Issues**: Check for CSS conflicts if storyline elements don't appear as expected.
- **Content Too Long**: If storyline text is too long, consider shortening it or breaking it into multiple parts. 