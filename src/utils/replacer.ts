export function replacer(template: string, ...values: string[]) {
  for (let text of values) {
    const position = values.indexOf(text) + 1;
    template = template.replace(`{${position}}`, text);
  }

  console.log(template, values)

  return template;
}
