import {IconProps} from "@/types/Icon";

const CreateTask = ({classContainer, fill = "none", height, width}: IconProps) => (
    <div
        className={classContainer}
    >
        <svg width={width} height={height} viewBox="0 0 10 11" fill={fill} xmlns="http://www.w3.org/2000/svg">
            <path d="M5.76923 9.73077C5.76923 10.1563 5.42548 10.5 5 10.5C4.57452 10.5 4.23077 10.1563 4.23077 9.73077V6.26923H0.769231C0.34375 6.26923 0 5.92548 0 5.5C0 5.07452 0.34375 4.73077 0.769231 4.73077H4.23077V1.26923C4.23077 0.84375 4.57452 0.5 5 0.5C5.42548 0.5 5.76923 0.84375 5.76923 1.26923V4.73077H9.23077C9.65625 4.73077 10 5.07452 10 5.5C10 5.92548 9.65625 6.26923 9.23077 6.26923H5.76923V9.73077Z"/>
        </svg>
    </div>
)
export default CreateTask