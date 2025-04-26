import { IconButton, Tooltip } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

interface DownloadButtonProps {
  onClick: () => void;
}

export const DownloadButton = ({ onClick }: DownloadButtonProps) => {
  return (
    <Tooltip title="Download Report">
      <IconButton
        onClick={onClick}
        sx={{
          color: "primary.main",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        }}
      >
        <DownloadIcon />
      </IconButton>
    </Tooltip>
  );
};