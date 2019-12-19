import { FileUpload } from 'graphql-upload'
import { unlinkSync, existsSync, mkdirSync, createWriteStream } from 'fs'
import * as pump from 'pump'
import * as shortid from 'shortid'
const cloudinary = require('cloudinary').v2

export interface Token {
  userId: string
}

export const APP_SECRET = process.env.APP_SECRET as string

export const isEmpty = (value: any) =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0)

export async function asyncForEach<T>(
  array: Array<T>,
  callback: (value: T, index: number, array: Array<T>) => void
) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

export const processUpload = async (upload: FileUpload) => {
  const { createReadStream } = await upload

  const stream = await createReadStream()

  // Temporarily store file
  const { path } = await storeUpload(stream)

  // Recored file to cloud storage
  const { url } = await recordFile(path)

  // Remove temporary file
  await unlinkSync(path)

  return url
}

const storeUpload = async (source: NodeJS.ReadableStream): Promise<any> => {
  const tempDirPath = 'tmp'
  if (!existsSync(tempDirPath)) {
    await mkdirSync(tempDirPath)
  }

  const path = `${tempDirPath}/${shortid.generate()}`
  const dest = createWriteStream(path)

  return new Promise((resolve, reject) => {
    pump(source, dest, err => {
      if (err) {
        reject()
      }

      resolve({ path })
    })
  })
}

const recordFile = async (path: string) => {
  const folder =
    process.env.NODE_ENV === 'production' ? 'nextup-prod' : 'nextup-test'

  const { secure_url } = await cloudinary.uploader.upload(path, {
    folder,
    transformation: [{ width: 300, crop: 'fit' }]
  })

  return { url: secure_url }
}
