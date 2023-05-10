//@ts-ignore
export function imageLoader({ src }) {
  return `/Public/${src}`; // REPLACE WITH YOUR IMAGE DIRECTORY
}

module.exports = imageLoader;
