import asyncStorage from '@react-native-async-storage/async-storage'

const jsonValue = (value) => JSON.stringify(value)

export const getData = async (localKey, parse) => {
  try {
    const value = await asyncStorage.getItem(localKey)
    if (parse && value) {
      return JSON.parse(value)
    } else if (parse && !value) return {}
    return value
  } catch (error) {
    console.log('file: asyncStorage.js ~ line 7 ~ getData ~ error', error)
  }
}

export const setData = async (keyName, value) => {
  try {
    await asyncStorage.setItem(keyName, typeof value === 'string' ? value : jsonValue(value))
  } catch (error) {
    console.log('file: asyncStorage.js ~ line 22 ~ setData ~ error', error)
  }
}

export const removeData = async (keyName) => {
  try {
    await asyncStorage.removeItem(keyName)
  } catch (error) {
    console.log('file: asyncStorage.js ~ line 22 ~ setData ~ error', error)
  }
}

export const getMultiple = async (multiKeys) => {
  try {
    const values = await asyncStorage.multiGet(multiKeys)
    return values
  } catch (error) {
    console.log('file: asyncStorage.js ~ line 38 ~ getMultiple ~ error', error)
  }
}

export const actualiceData = async (keyName, value) => {
  try {
    const values = await asyncStorage.multiGet(keyName, jsonValue(value))
    return values
  } catch (error) {
    console.log(
      'file: asyncStorage.js ~ line 48 ~ actualiceData ~ error',
      error
    )
  }
}
