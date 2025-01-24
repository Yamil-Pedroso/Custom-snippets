import readSnippets from './images/svg/read_snippets.svg'
import bg_1 from './images/jpg/bg_1.jpg'
import bg_2 from './images/png/bg.png'
import demoSnippets from './videos/demo-snippets.mp4'

interface IImages {
    [key: string]: string
}

const images: IImages = {
    readSnippets,
    bg_1,
    bg_2,
    demoSnippets
}

export default images
