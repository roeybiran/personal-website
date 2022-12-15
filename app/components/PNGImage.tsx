import { Image } from "react-datocms";
import type { ImagePropTypes } from "react-datocms";

export default function PNGImage(props: ImagePropTypes) {
	return <Image {...props} usePlaceholder={false} />;
}
