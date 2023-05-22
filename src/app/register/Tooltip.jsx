import Tooltip from "@mui/material/Tooltip";

export default function Toooltip(props) {
  return (
    <Tooltip
      arrow
      followCursor
      title={<span style={{ whiteSpace: "pre-line" }}>{props.text}</span>}
    >
      <span>{props.children}</span>
    </Tooltip>
  );
}
