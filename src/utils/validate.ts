export const isValidUsername = (str: string) => ['admin', 'editor'].indexOf(str.trim()) >= 0

// 判断引入的路径是为外部路径
export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path)