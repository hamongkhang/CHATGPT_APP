import React, { useState, useEffect, useRef } from "react";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const Content = (props) => {
  const chatContainerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [listMessage, setListMessage] = useState([]);
  const [suggest, setSuggest] = useState();
  const [isDropdown, setIsDropdown] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleEnterPress();
    }
  };

  const handleEnterPress = () => {
    if (!isError) {
      if (listMessage.length % 2 !== 0) {
        return;
      }
    } else {
      setIsError(false);
    }
    setMessage("");
    setListMessage([...listMessage, message]);
    setTimeout(async () => {
      await sendMessage(message);
      setLoading(false);
    }, 1000);
  };

  const handleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const handleChangeSuggest = (message) => {
    setMessage(message);
    setIsDropdown(!isDropdown);
  };

  const generateSuggestedQuestions = (answer) => {
    const suggestedQuestions = [
      `Cho tôi thêm thông tin được không?`,
      `Tại sao nó lại quan trọng?`,
    ];

    return suggestedQuestions;
  };

  const sendMessage = async (message) => {
    var apiKey = "fps4J0CkOPtBSKv8Xo3iT3BlbkFJoxrL3Ouc0kvMrfLHb4nF";
    if (isLoading) {
      return;
    }
    setLoading(true);
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          messages: [
            { role: "system", content: "You are" },
            { role: "user", content: message },
          ],
          model: "gpt-3.5-turbo",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer sk-" + apiKey,
          },
        }
      );

      const newMessage = response.data.choices[0].message.content;
      setSuggest(generateSuggestedQuestions(newMessage));
      setListMessage([...listMessage, message, newMessage]);
    } catch (error) {
      setIsError(true);
      setListMessage([...listMessage, message, "ChatBox...."]);
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Đánh dấu kết thúc loading
    }
  };
  const handleMenuToggle = () => {
    props.setShowMenu(!props.showMenu);
  };

  const changeMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleDelete = () => {
    setListMessage([]);
    props.setShowMenu(!props.showMenu);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (listMessage.length % 2 !== 0) {
      return;
    }
    setMessage("");
    setListMessage([...listMessage, message]);
    setTimeout(async () => {
      await sendMessage(message);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [listMessage]);

  return (
    <Box
      className="background1"
      sx={{
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 1)",
        backgroundSize: "cover",
        backgroundBlendMode: "darken",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={4} sm={6} md={2}></Grid>
        <Grid item xs={4} sm={8} md={8}>
          <Box
            className="container_responsive"
            sx={{
              width: "100%",
              backgroundColor: "#181818",
            }}
          >
            <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
              <Grid item xs={4} sm={8} md={12}>
                {listMessage.length ? (
                  <Box
                    className="chat-container"
                    ref={chatContainerRef}
                    sx={{
                      width: "100%",
                      backgroundColor: "#181818",
                      display: "flex",
                      flexDirection: "column",
                      overflowY: "auto",
                    }}
                  >
                    {listMessage.map((message, index) => {
                      return (
                        <Box
                          key={index}
                          className={index === 0 ? "content_container" : "no"}
                          sx={{
                            width: "100%",
                            left: "460px",
                            top: "33px",
                            display: "flex",
                            background: index % 2 === 0 ? "#262626" : "#181818",
                            borderRadius:
                              index === 0
                                ? "8px 8px 0px 0px"
                                : "0px 0px 0px 0px",
                            padding: "32px 32px 32px 32px",
                          }}
                        >
                          {index % 2 === 0 ? (
                            <img
                              src="https://hamongkhang.github.io/CHATGPT_APP/images/you.png"
                              alt="Ảnh"
                              style={{
                                width: "44px",
                                height: "44px",
                                marginRight: "16px",
                              }}
                            />
                          ) : (
                            <img
                              src="https://hamongkhang.github.io/CHATGPT_APP/images/chatgpt-icon-logo.png"
                              alt="Ảnh"
                              style={{
                                width: "44px",
                                height: "44px",
                                marginRight: "16px",
                              }}
                            />
                          )}
                          <div
                            style={{
                              width: "100%",
                              left: "0px",
                              top: "0px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "normal",
                            }}
                          >
                            <Typography
                              width="100%"
                              fontFamily="Roboto"
                              fontWeight={400}
                              fontSize={14}
                              color="rgba(211, 211, 211, 1)"
                              style={{
                                whiteSpace: "normal",
                                wordWrap: "break-word",
                                hyphens: "auto",
                              }}
                            >
                              {message}
                            </Typography>
                          </div>
                        </Box>
                      );
                    })}
                    {loading ? (
                      <Box
                        sx={{
                          width: "100%",
                          left: "460px",
                          top: "33px",
                          display: "flex",
                          background: "#181818",
                          borderRadius: "0px 0px 0px 0px",
                          padding: "32px 32px 32px 32px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginRight: "16px",
                          }}
                        >
                          <img
                            src="https://hamongkhang.github.io/CHATGPT_APP/images/chatgpt-icon-logo.png"
                            alt="Ảnh"
                            style={{
                              width: "44px",
                              height: "44px",
                            }}
                          />
                          <div
                            style={{
                              width: "10px",
                              height: "10px",
                              backgroundColor: "#3F5AC8",
                              borderRadius: "50%",
                              animation: "bounce 0.6s infinite",
                              marginLeft: "4px",
                            }}
                          ></div>
                          <div
                            style={{
                              width: "10px",
                              height: "10px",
                              backgroundColor: "#3F5AC8",
                              borderRadius: "50%",
                              animation: "bounce 0.6s infinite",
                              marginLeft: "4px",
                            }}
                          ></div>
                          <div
                            style={{
                              width: "10px",
                              height: "10px",
                              backgroundColor: "#3F5AC8",
                              borderRadius: "50%",
                              animation: "bounce 0.6s infinite",
                              marginLeft: "4px",
                            }}
                          ></div>
                        </div>
                      </Box>
                    ) : null}
                    {/* {listMessage.length % 2 === 0 && !isError ? (
                      <>
                        <Box
                          onClick={() => handleDropdown()}
                          sx={{
                            width: "182.78px",
                            height: "40px",
                            top: "321.67px",
                            left: "16px",
                            borderRadius: "36px",
                            backgroundColor: "rgba(38, 38, 38, 1)",
                            display: "flex",
                            marginLeft: "16px",
                            alignItems: "center",
                            marginBottom: "20px",
                            padding: "0px 0px 0px 20px",
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              fontFamily: "Roboto",
                              fontWeight: 400,
                              fontSize: "14px",
                              lineHeight: "23px",
                              color: "#ffffff",
                            }}
                          >
                            Suggested question
                          </Typography>
                          {isDropdown ? (
                            <ArrowDropDownIcon
                              style={{
                                color: "rgba(109, 109, 109, 1)",
                              }}
                            />
                          ) : (
                            <ArrowRightIcon
                              style={{
                                color: "rgba(109, 109, 109, 1)",
                              }}
                            />
                          )}
                        </Box>
                        {isDropdown
                          ? suggest
                            ? suggest.map((item) => {
                                return (
                                  <div
                                    onClick={() => handleChangeSuggest(item)}
                                    style={{
                                      width: "100%",
                                      position: "relative",
                                      padding: "0px 20px 10px 16px",
                                    }}
                                  >
                                    <input
                                      onChange={(e) => changeMessage(e)}
                                      value={item}
                                      readOnly
                                      style={{
                                        boxSizing: "border-box",
                                        width: "100%",
                                        height: "40px",
                                        borderRadius: "8px",
                                        marginBottom: "5px",
                                        background: "rgba(0, 0, 0, 1)",
                                        border: "1.5px solid #000000",
                                        padding: "8px",
                                        color: "rgba(211, 211, 211, 1)",
                                        fontSize: "14px",
                                        paddingRight: "60px",
                                      }}
                                    />
                                    <div
                                      style={{
                                        position: "absolute",
                                        top: "38%",
                                        right: "30px",
                                        transform: "translateY(-50%)",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "4px",
                                        zIndex: 1,
                                      }}
                                    >
                                      <SendIcon style={{ color: "#6D6D6D" }} />
                                    </div>
                                  </div>
                                );
                              })
                            : null
                          : null}
                      </>
                    ) : null} */}
                  </Box>
                ) : null}
              </Grid>
              <Grid item xs={4} sm={8} md={12}>
                {listMessage.length ? null : (
                  <Box
                    className="component_1"
                    sx={{
                      width: "100%",
                      backgroundColor: "#181818",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="https://hamongkhang.github.io/CHATGPT_APP/images/content.png"
                      alt="Ảnh"
                      style={{
                        marginRight: "16px",
                      }}
                    />
                  </Box>
                )}
                <Box
                  className="descriptionmain"
                  sx={{
                    width: "100%",
                    backgroundColor: "#181818",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="input1"
                    style={{ width: "100%", position: "relative" }}
                  >
                    <input
                      onKeyDown={handleKeyPress}
                      onChange={(e) => changeMessage(e)}
                      value={message}
                      style={{
                        boxSizing: "border-box",
                        width: "100%",
                        height: "40px",
                        borderRadius: "8px",
                        background: "#222222",
                        border: "1.5px solid #434343",
                        padding: "8px",
                        color: "#ffffff",
                        paddingRight: "60px",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "8px",
                        transform: "translateY(-50%)",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        zIndex: 1,
                      }}
                    >
                      {message ? (
                        <IconButton onClick={(e) => handleSendMessage(e)}>
                          <SendIcon style={{ color: "#6D6D6D" }} />
                        </IconButton>
                      ) : (
                        <IconButton onClick={handleMenuToggle}>
                          <MoreHorizIcon style={{ color: "#6D6D6D" }} />
                        </IconButton>
                      )}
                      {props.showMenu && (
                        <div class="image-container">
                          <Box
                          className="deleteClick"
                            onClick={handleDelete}
                            sx={{
                              position: "fixed",
                              width: "141px",
                              height: "Hug (31px)",
                              top: "-31px",
                              borderRadius: "8px",
                              backgroundColor: "rgba(55, 55, 55, 1)",
                              zIndex: 2, // Đẩy lên trên dấu ba chấm
                              display: "flex",
                              alignItems: "center",
                              transform: "translateY(-50%)",
                            }}
                          >
                            <IconButton>
                              <DeleteIcon
                                style={{
                                  color: "rgba(218, 218, 218, 1)",
                                  width: "13.75px",
                                  height: "15px",
                                }}
                              />
                            </IconButton>
                            <Typography
                              fontFamily="Roboto"
                              fontWeight={400}
                              fontSize={14}
                              lineHeight="23px"
                              color="rgba(218, 218, 218, 1)"
                              sx={{
                                width: "Hug (40px)",
                                height: "Hug (23px)",
                              }}
                            >
                              Delete
                            </Typography>
                          </Box>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className="input2"
                    style={{ width: "100%", alignItems: "center" }}
                  >
                    <input
                      onKeyDown={handleKeyPress}
                      onChange={(e) => changeMessage(e)}
                      value={message}
                      style={{
                        boxSizing: "border-box",
                        width: "100%",
                        height: "40px",
                        borderRadius: "8px",
                        background: "#222222",
                        border: "1.5px solid #434343",
                        padding: "8px",
                        color: "#ffffff",
                        marginLeft: "10px",
                      }}
                    />
                    {message ? (
                      <IconButton onClick={(e) => handleSendMessage(e)}>
                        <SendIcon
                          style={{ marginLeft: "5px", color: "#6D6D6D" }}
                        />
                      </IconButton>
                    ) : (
                      <IconButton onClick={handleMenuToggle}>
                        <MoreHorizIcon
                          style={{ marginLeft: "5px", color: "#6D6D6D" }}
                        />
                      </IconButton>
                    )}
                    {props.showMenu && (
                      <div class="image-container">
                        <Box
                        className="delete_button"
                          onClick={handleDelete}
                          sx={{
                            position: "absolute",
                            width: "91px",
                            height: "Hug (31px)",
                            right: "20px",
                            borderRadius: "8px",
                            backgroundColor: "rgba(55, 55, 55, 1)",
                            zIndex: 2,
                            bottom:"20px",
                            display: "flex",
                            alignItems: "center",
                            transform: "translateY(-50%)",
                          }}
                        >
                          <IconButton>
                            <DeleteIcon
                              style={{
                                color: "rgba(218, 218, 218, 1)",
                                width: "13.75px",
                                height: "15px",
                              }}
                            />
                          </IconButton>
                          <Typography
                            fontFamily="Roboto"
                            fontWeight={400}
                            fontSize={14}
                            lineHeight="23px"
                            color="rgba(218, 218, 218, 1)"
                            sx={{
                              width: "Hug (40px)",
                              height: "Hug (23px)",
                            }}
                          >
                            Delete
                          </Typography>
                        </Box>
                      </div>
                    )}
                  </div>
                  <Typography
                    className="description"
                    component="div"
                    fontSize={10}
                    fontFamily="Roboto"
                    color="rgba(211, 211, 211, 1)"
                    style={{
                      marginTop: 10,
                      textAlign: "center",
                    }}
                  >
                    Free Research Preview. ChatGPT may product inaccurate
                    information about people, place, or fact
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={4} sm={6} md={2}></Grid>
      </Grid>
    </Box>
  );
};

export default Content;
