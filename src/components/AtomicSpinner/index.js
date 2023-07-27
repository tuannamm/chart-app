import AtomicSpinner from "atomic-spinner";
import { memo } from "react";

const Spinner = ({ props }) => <AtomicSpinner {...props} />;

export default memo(Spinner);
