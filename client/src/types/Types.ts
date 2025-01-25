import { RiOrganizationChart,RiGlobalLine,

} from "react-icons/ri";
import { AiOutlineFolder, AiOutlineSafety, AiOutlineSearch } from "react-icons/ai";
import { BiCodeAlt } from "react-icons/bi";
import { MdOutlineGroupWork } from "react-icons/md";
import { FaFileCode } from "react-icons/fa6";

import { IconType } from "react-icons";

interface IFeatures {
    content: string
    icon: IconType | string
}

const features: IFeatures[] = [
    {
        content: "Intuitive Organization",
        icon: RiOrganizationChart
    },
    {
        content: "Global Sharing",
        icon: RiGlobalLine
    },
    {
        content: "Guaranteed Security",
        icon: AiOutlineSafety
    },
    {
        content: "Save snippets organized by categories.",
        icon: AiOutlineFolder
    },
    {
        content: "Support for multiple programming languages.",
        icon: BiCodeAlt
    },
    {
        content: "Advanced snippet search functionality.",
        icon: AiOutlineSearch
    },
    {
        content: "Share snippets with colleagues or teams.",
        icon: MdOutlineGroupWork
    },
    {
        content: "Syntax-highlighted editor.",
        icon: FaFileCode
    }
]

export { features }
