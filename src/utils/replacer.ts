export function replacer(template: string, ...values: string[]) {
  for (let text of values) {
    const position = values.indexOf(text) + 1;
    template.replace(`{${position}}`, text);
  }

  return template;
}
