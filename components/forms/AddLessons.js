import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Tooltip from "@mui/material/Tooltip";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

const AddLessons = ({
  handleVideo,
  handleClose,
  values,
  setValues,
  handleAddLesson,
  uploading,
  uploadButton,
  progress,
  handleVideoRemove,
}) => {
  return (
    <>
      <DialogTitle>+ Add Lessons</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <form onSubmit={handleAddLesson}>
          <TextField
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            values={values.title}
            autoFocus
            required
            margin="dense"
            id="title"
            label="Add Title"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={(e) => setValues({ ...values, content: e.target.value })}
            values={values.content}
            id="content"
            name="content"
            margin="dense"
            label="Add Content here"
            multiline
            rows={7}
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={handleVideo}
            autoFocus
            required
            margin="dense"
            id="video"
            label={uploadButton}
            type="file"
            accept="video/*"
            hidden
            sx={{ width: "50ch" }}
            variant="standard"
          />
          {!uploading && values.video.Location && (
            <Tooltip title="Remove" placement="top">
              <Button onClick={handleVideoRemove} color="error">
                <CancelPresentationIcon />
              </Button>
            </Tooltip>
          )}
          {uploading && progress > 0 && (
            <Box sx={{ width: "100%" }}>
              <LinearProgress color="success" />
            </Box>
          )}

          <DialogActions>
            <Button
              type="submit"
              disabled={uploading}
              loading={uploading}
            >
              {uploading ? "Uploading..." : "Save & Continue"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </>
  );
};

export default AddLessons;
