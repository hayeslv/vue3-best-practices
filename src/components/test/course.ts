interface Course {
  name: string,
  price: number[],
  public: string,
  pic?: string | boolean,
  key(): string
}

let vueCourse: Course = {
  name: '玩转vue3',
  price: [59, 129],
  public: '前端菜鸡',
  pic: false,
  key() {
    return '88'
  }
}

function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
  return o[name];
}