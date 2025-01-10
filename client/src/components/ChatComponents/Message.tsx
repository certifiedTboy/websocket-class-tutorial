import React, { Fragment } from "react";
import classes from "./Chat.module.css";
import Moment from "react-moment";
import { generateRandomNameForFile } from "../../helpers/file";

const Message = (props: {
  own: any;
  sender: string;
  message: string | undefined;
  userImage: string | undefined;
  uploadedFile: string | undefined;
  messageTime: any;
}) => {
  return (
    <Fragment>
      <div>
        {props.own && (
          <div className={`${classes.message} ${classes.own}`}>
            <h5 className={classes.username_own}>{props.sender}</h5>
            {props.messageTime ? (
              <Moment className={classes.meta_own} fromNow>
                {new Date(props.messageTime)}
              </Moment>
            ) : (
              <Moment className={classes.meta_own} fromNow>
                {new Date()}
              </Moment>
            )}
            <div className={classes.messageTop}>
              <p className={classes.messageText}>
                {props?.message}
                {props.uploadedFile && (
                  <div className="group relative my-2.5 ">
                    <div className="absolute w-full h-full bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                      <a
                        href={props?.uploadedFile
                          .split("/")
                          .map((ele: any) =>
                            ele === "upload"
                              ? ele.concat("/fl_attachment")
                              : ele
                          )
                          .join("/")}
                        download={generateRandomNameForFile()}
                      >
                        <button
                          data-tooltip-target="download-image"
                          className="inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50"
                        >
                          <svg
                            className="w-5 h-5 text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 16 18"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
                            />
                          </svg>
                        </button>

                        <div
                          id="download-image"
                          role="tooltip"
                          className="absolute inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                        >
                          Download image
                          <div
                            className="tooltip-arrow"
                            data-popper-arrow
                          ></div>
                        </div>
                      </a>
                    </div>
                    {/* <img src={file} className="rounded-lg" /> */}
                    <img src={props.uploadedFile} className="rounded-lg" />
                  </div>
                )}
              </p>
              <img
                className={classes.messageImg}
                src={props.userImage}
                alt="profile img"
              />
            </div>
          </div>
        )}

        {!props.own && (
          <div className={`${classes.message}`}>
            <h5 className={classes.username_other}>{props.sender}</h5>
            {props.messageTime ? (
              <Moment className={classes.meta} fromNow>
                {new Date(props.messageTime)}
              </Moment>
            ) : (
              <Moment className={classes.meta} fromNow>
                {new Date()}
              </Moment>
            )}
            <div className={classes.messageTop}>
              <img
                className={classes.messageImg}
                src={props.userImage}
                alt="profile img"
              />
              <p className={classes.messageText}>
                {props?.message}
                {props.uploadedFile && (
                  <div className="group relative my-2.5 ">
                    <div className="absolute w-full h-full bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                      <a
                        href={props?.uploadedFile
                          .split("/")
                          .map((ele: any) =>
                            ele === "upload"
                              ? ele.concat("/fl_attachment")
                              : ele
                          )
                          .join("/")}
                        download={generateRandomNameForFile()}
                      >
                        <button
                          data-tooltip-target="download-image"
                          className="inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50"
                        >
                          <svg
                            className="w-5 h-5 text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 16 18"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
                            />
                          </svg>
                        </button>

                        <div
                          id="download-image"
                          role="tooltip"
                          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                        >
                          Download image
                          <div
                            className="tooltip-arrow"
                            data-popper-arrow
                          ></div>
                        </div>
                      </a>
                    </div>
                    {/* <img src={file} className="rounded-lg" /> */}
                    <img src={props.uploadedFile} className="rounded-lg" />
                  </div>
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Message;
