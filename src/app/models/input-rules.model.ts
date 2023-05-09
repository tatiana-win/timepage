/**
 * перечисление возможных событий, по которым срабатывает проверка на ошибки
 */
export const enum InputRules {
  touched = 'touched',
  dirty = 'dirty'
}

export class DescriptionRules {
  constructor(public name: string, public description: string, public rules: InputRules[]) {}
}
