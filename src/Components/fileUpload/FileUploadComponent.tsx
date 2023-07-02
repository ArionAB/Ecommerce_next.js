'use client'

import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { useAppDispatch } from "../../Store";
// import "./FileUploadComponent.scss";

interface FileUploadProps {
  onFilesChange?: Function;
  showSize?: boolean;
  uploadOnButtonCallback?: Function;
  uploadDisabled?: boolean;
  fileLimit?: number;
  fontSize?: string;
  acceptedFileformats?: Array<string>;
  fileUploadText?: string;
  existentFile?: File;
}

const FileUploadComponent: FC<FileUploadProps> = ({
  onFilesChange,
  showSize,
  uploadOnButtonCallback,
  uploadDisabled,
  fileLimit,
  fontSize,
  acceptedFileformats,
  fileUploadText,
  existentFile,
}) => {
  const [files, setFiles] = useState<Array<File>>(
    existentFile ? [existentFile] : []
  );

  const [acceptedFiles, setAcceptedFiles] = useState<Array<File>>([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (onFilesChange) onFilesChange(files);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  useEffect(() => {
    if (fileLimit !== undefined) {
      if (acceptedFiles.length + files.length <= fileLimit) {
        setFiles((prev) => [...prev, ...acceptedFiles]);
      } else {
        alert("File limit exceeded");
      }
    } else {
      setFiles((prev) => [...prev, ...acceptedFiles]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acceptedFiles]);

  const onDrop = useCallback(
    (acceptedFiles: Array<File>, fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        if (fileRejections[0].errors[0].code === "file-invalid-type") {
          alert("Invalid file type");
        }
        if (fileRejections[0].errors[0].code === "too-many-files") {
          alert("Too many files");
        }
      }
      setAcceptedFiles(acceptedFiles);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    maxFiles: fileLimit,
    //@ts-ignore
    accept: acceptedFileformats,
  });
  const hasFiles = files.length > 0;

  const removeFile = (fileToRemove: File) => {
    let newFiles: Array<File> = files.filter((file) => file !== fileToRemove);
    setFiles(newFiles);
  };

  const openExplorerDialog = (event: any) => {
    if (event.target.className instanceof SVGAnimatedString) return;
    open();
  };

  const removeAllFiles = () => {
    setFiles([]);
  };

  const setTotalFileSize = () => {
    let totalSize = 0;
    files.forEach((file) => {
      totalSize += file.size;
    });

    if (totalSize > 100000000) {
      setFiles([]);
    }
  };

  useEffect(() => {
    setTotalFileSize();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  return (
    <Grid sx={{ height: "100%" }}>
      <Grid sx={{ height: "90%" }}>
        <Paper
          className="upload-file-component"
          {...getRootProps()}
          sx={{
            height: "100%",
            width: "100%",
            overflowY: "auto",
            ":hover": { cursor: "pointer" },
            boxSizing: "border-box",
            p: 1,
          }}
          elevation={isDragActive ? 15 : 5}
          onClick={(e: any) => openExplorerDialog(e)}
        >
          <input {...getInputProps()} />
          {!hasFiles && (
            <Grid
              container
              justifyContent="center"
              alignContent="center"
              sx={{ height: "100%" }}
            >
              <Grid item>
                {isDragActive ? (
                  <Typography variant="h5" color="secondary" textAlign="center">
                    Drop the files here ...
                  </Typography>
                ) : (
                  <Typography
                    variant="h5"
                    textAlign="center"
                    sx={{ fontSize: fontSize }}
                  >
                    {fileUploadText ??
                      "Drag 'n' drop some files here, or click to select files"}
                  </Typography>
                )}
              </Grid>
            </Grid>
          )}

          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {files.map((file, index) => (
              <Box sx={{ padding: "3px" }} key={`file-key-${index}`}>
                <Chip
                  label={
                    showSize
                      ? file.name +
                      "  " +
                      (file.size / 1024 / 1024).toFixed(2) +
                      "MB"
                      : file.name
                  }
                  variant="outlined"
                  onDelete={() => {
                    removeFile(file);
                  }}
                />
              </Box>
            ))}
          </Box>
        </Paper>
      </Grid>
      <Grid>
        <Box sx={{ height: "10%" }}>
          {uploadOnButtonCallback && (
            <Grid
              sx={{
                justifyContent: "flex-end",
                marginTop: 1,
                display: "flex",
              }}
            >
              <Grid sx={{ paddingRight: 1 }}>
                <Button
                  disabled={!hasFiles}
                  color={"error"}
                  variant="contained"
                  onClick={(e) => {
                    if (!uploadDisabled) removeAllFiles();
                  }}
                >
                  Delete
                </Button>
              </Grid>
              <Grid>
                <Tooltip title="Încarcă Fișierele">
                  <Button
                    disabled={uploadDisabled}
                    variant="contained"
                    color={"success"}
                    onClick={(e) => {
                      if (!uploadDisabled && hasFiles)
                        uploadOnButtonCallback(files, removeAllFiles);
                    }}
                  >
                    Upload
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default FileUploadComponent;
