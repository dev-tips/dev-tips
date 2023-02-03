Title: LTR/RTL text direction support and localized content examples in Storybook

-----

Date: 1675422887

-----

Description: Toggling stories and their content between LTR and RTL text direction in Storybook does not require an add-on and is possible using Storybook’s built-in global types.

-----

Authors: rasshofer

-----

Text:

When working on a design system component library for applications with international audience intending to go global, it’s essential to consider internationalization and localization as a first-class citizen of product design and development.

While languages such as English, German, or Chinese have left-to-right (LTR) direction, others such as Arabic, Hebrew, and Urdu are written and read from right to left (RTL) and in different variants of vertical writing—involving more than just text translation.

To always keep this in mind, adding localized examples and LTR/RTL text direction support into Storybook is essential. Fortunately, Storybook provides a simple way for configuring custom toolbar menus.

(image: locale-toolbar.png bordered: true)

In your `.storybook/preview.ts` (or `.storybook/preview.tsx` when using the React version resp. `.storybook/preview.js` or `.storybook/preview.jsx` if you’re not using TypeScript), you can add your own toolbar by creating `globalTypes` with a `toolbar` annotation as well as `decorators` for wrapping your Storybook stories with the necessary extra markup for having the right attributes `lang` and `dir` set.

```ts
const getDirectionForLocale = (locale: string): 'ltr' | 'rtl' => {
  if (locale === 'ar') {
    return 'rtl';
  }
  return 'ltr';
};

const locales = [
  { key: 'en', emoji: '🇩🇪', title: 'Deutsch' },
  { key: 'zh', emoji: '🇨🇳', title: '中文' },
  { key: 'ar', emoji: '🇸🇦', title: 'العربية' },
  { key: 'ru', emoji: '🇷🇺', title: 'Русский' },
] as const;

export const globalTypes = {
  locale: {
    name: 'Locale',
    defaultValue: locales[0].key,
    toolbar: {
      icon: 'globe',
      items: locales.map((locale) => ({
        value: locale.key,
        left: locale.emoji,
        title: locale.title,
        right: getDirectionForLocale(locale.key).toUpperCase(),
      })),
      showName: true,
    },
  },
};

export const decorators = [
  (Story: (context: StoryContext) => TemplateResult, context: StoryContext) => {
    const locale = context.globals.locale ?? locales[0].key;
    return html`<div lang="${locale}" dir="${getDirectionForLocale(locale)}">
      ${Story(context)}
    </div>`;
  },
];
```

While the aforementioned story decorator is an example for Storybook for Web Components, it can easily adapted for e.g. Storybook for React.

```tsx
export const decorators = [
  (Story, context) => (
    <div lang={locale} dir={getDirectionForLocale(locale)}>
      <Story {...context} />
    </div>
  ),
];
```

This enables the toolbar for switching the locale and rendering the appropriate HTML wrapper attributes. A logical next step could be to have localized and translated copy text in stories as well. All global variables defined in `globalTypes` are passed and accessible as part of the second parameter of the story functions.

```ts
const sayHello = (locale: string): string => {
  const locales: Record<string, string> = {
    de: 'Hallo Welt',
    zh: '你好世界',
    ar: 'مرحبا بالعالم',
    ru: 'Здравствулте мир',
  };
  return locales[locale] ?? locales.de;
};

const Template: Story<SomeButton> = ({ variant }, { globals: { locale } }) => {
  const label = sayHello(locale);

  return html`<some-button variant=${variant}>${label}</some-button>`;
};

export const Button: Story<SomeButton> = Template.bind({});

Button.args = {
  variant: 'primary',
};
```

As a result, both LTR/RTL text direction support and internationalization now are deeply integrated into your development process.

(video: result.mp4 width: 2150  height: 800 autoplay: true muted: true loop: true bordered: true)
