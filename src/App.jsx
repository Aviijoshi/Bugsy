// import React from "react";
import "./App.css";
import React, { useEffect, useState } from "react";
import CriticalBox from "./components/CriticalBox";
import Navbar from "./components/Navbar";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import WarningCom from "./components/WarningCom";
import ProgressBar from "./components/ProgressBar";
import { ClipLoader } from "react-spinners";
import { LuSparkles } from "react-icons/lu";
import { LuFile } from "react-icons/lu";
import { LuLightbulb } from "react-icons/lu";
import { BsStars } from "react-icons/bs";
import { LuCheck } from "react-icons/lu";
import { LuX } from "react-icons/lu";
import { LuMessageSquareCode } from "react-icons/lu";
import Editor from "@monaco-editor/react";
import ScoreSquare from "./components/ScoreSquare";
import SecurityAudit from "./components/SecurityAudit";
import { explain, main, fix } from "./AI";
const App = () => {
  const [isNoContent, setIsNoContent] = useState(true);
  const [screen, setScreen] = useState("noscreen");
  const [language, setLanguage] = useState("html");
  const [code, setCode] = useState("");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [explainData, setExplainData] = useState("");
  function handleEditorWillMount(monaco) {
    monaco.editor.defineTheme("codeReviewTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "keyword", foreground: "8B7CFF" },
        {
          token: "entity.name.function",
          foreground: "2EE6A6",
          fontStyle: "bold",
        },
        { token: "identifier", foreground: "E6E6F0" },
        { token: "string", foreground: "FF9E7A" },
        { token: "number", foreground: "FFB86B" },
        { token: "comment", foreground: "808080", fontStyle: "italic" },
        { token: "type.identifier", foreground: "F6C177" },
        { token: "delimiter", foreground: "CFCFE6" },
      ],
      colors: {
        "editor.background": "#09090F",
        "editor.foreground": "#E6E6F0",
        "editorCursor.foreground": "#8B7CFF",
        "editor.lineHighlightBackground": "#11111A",
        "editor.selectionBackground": "#7C6BFF22",
        "editorLineNumber.foreground": "#4A4A5C",
        "editorLineNumber.activeForeground": "#8B7CFF",
        "editorGutter.background": "#09090F",
        "editorIndentGuide.background": "#1A1A26",
        "minimap.background": "#09090F",
        "editorSuggestWidget.background": "#11111A",
        "editorSuggestWidget.border": "#1F1F2E",
        "editorSuggestWidget.selectedBackground": "#1A1A26",
        "scrollbarSlider.background": "#1A1A26",
        "scrollbarSlider.hoverBackground": "#2A2A3D",
        "editorBracketMatch.background": "#1A1A26",
        "editorBracketMatch.border": "#8B7CFF",
        "editorGroup.border": "#1A1A26",
      },
    });
  }
  const get_response = async () => {
    if (code === "") {
      toast.error("Please enter some code to analyze");
      return;
    }
    try {
      setLoading(true);
      let res = await main(code, language);
      console.log("RES:", res);
      setData(JSON.parse(res));
      setIsNoContent(false);
      setScreen("analyze");
    } catch (error) {
      toast.error("Something went wrong", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log(code);
    console.log(language);
  }, [code, language]);
  const explain_data = async () => {
    if (code === "") {
      toast.error("Please write some code for explaination!");
      return;
    }
    try {
      setLoading(true);
      let res = await explain(code, language);
      setExplainData(res);
      setIsNoContent(false);
      setScreen("explain");
    } catch (error) {
      toast.error("Something went wrong", error);
    } finally {
      setLoading(false);
    }
  };
  const fixCode = async () => {
    if (code === "") {
      toast.error("Please enter some code to fix");
      return;
    }
    try {
      setLoading(true);
      let res = await fix(code, language);
      setCode(res);
    } catch (error) {
      toast.error("Something went wrong", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />
      <div className="container">
        {/* Left screen */}
        <div className="left w-[50%] h-full overflow-auto ">
          <div className="left-header flex items-center justify-between h-[4rem] px-[35px] ">
            <div className="">
              <select
                onChange={(e) => {
                  setLanguage(e.target.value);
                }}
                value={language}
                className="language-selector "
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="c">C</option>
                <option value="csharp">C#</option>
                <option value="go">Go</option>
                <option value="rust">Rust</option>
                <option value="php">PHP</option>
                <option value="ruby">Ruby</option>
                <option value="kotlin">Kotlin</option>
                <option value="swift">Swift</option>
                <option value="dart">Dart</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="sql">SQL</option>
                <option value="shell">Shell / Bash</option>
              </select>
            </div>

            <div>
              <button
                disabled={loading}
                onClick={get_response}
                className="green-btn flex items-center gap-2"
              >
                <i>
                  {loading ? (
                    screen === "analyze" ? (
                      <ClipLoader
                        color="#A7F3D0"
                        loading={loading}
                        size={20}
                        aria-label="Loading Spinner"
                      />
                    ) : (
                      <LuSparkles />
                    )
                  ) : (
                    ""
                  )}
                </i>
                Analyze Code
              </button>
            </div>
          </div>
          <div className="code-editor">
            <Editor
              onChange={(code) => {
                setCode(code);
              }}
              value={code}
              height="100%"
              language={language}
              beforeMount={handleEditorWillMount}
              // value="// Write your code here"
              theme="codeReviewTheme"
              options={{
                fixedOverflowWidgets: true,
                padding: { top: 20 },
              }}
            />
          </div>
          <div className="buttons px-[10px] flex items-center w-full gap-[10px] ">
            <button
              className="trans flex items-center w-full gap-[10px] justify-center"
              onClick={fixCode}
            >
              Fix Code
            </button>
            <button
              onClick={explain_data}
              className="trans flex items-center w-full gap-[10px] justify-center"
            >
              Explain Code
            </button>
          </div>
        </div>
        {/* Right screen  */}
        <div className="right w-[50%] h-full overflow-auto ">
          {isNoContent ? (
            <div className=" w-full h-full flex items-center flex-col justify-center">
              <i className="flex items-center justify-center p-[10px] w-[120px] h-[120px] rounded-[50%] bg-[var(--mint)] text-[55px] ">
                <LuMessageSquareCode />
              </i>
              <p className="text-white text-3xl mt-3 font-[700] ">
                Analyze Code
              </p>
              <p>To see result</p>
            </div>
          ) : (
            ""
          )}

          {screen === "analyze" ? (
            <div className="w-full h-full p-[20px]  ">
              <div className="flex items-center gap-[15px]  ">
                <ScoreSquare score={data?.overallScore} />
                <div className="flex items-center flex-col gap-[5px] ">
                  <h3 className="text-[35px] font-[700] ">Overall Score</h3>
                  <p className="text-gray-400">
                    Complete Analysis based on 42 Rules.
                  </p>
                </div>
              </div>
              <div className=" gridBox  mt-6 ">
                {/* <ProgressBar name={"test"} score={70} /> */}
                {data?.scoreBreakdown?.map((item, index) => {
                  return (
                    <ProgressBar
                      key={index}
                      name={item.name}
                      score={item.score}
                    />
                  );
                })}
              </div>

              {data?.summary && (
                <div className="summary p-[15px] mt-3 bg-[#17192C] rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[10px]">
                      <i className="text-[22px] text-[var(--mint)]">
                        <LuFile />
                      </i>

                      <h3 className="font-semibold text-[20px] text-[var(--mint)]">
                        Summary
                      </h3>
                    </div>

                    <i className="text-[30px] text-gray-500">
                      <BsStars />
                    </i>
                  </div>

                  <p className="mt-4 text-white">{data.summary}</p>
                </div>
              )}

              {data?.critical ? (
                data.critical.length > 0 ? (
                  <>
                    <div className="criticalcon ">
                      <p className=" critical-section font-[700] text-[#ff5e71]  ">
                        CRITICAL
                      </p>
                      {/* <CriticalBox
                  data={{
                    title: "Error Handling",
                    description:
                      "Your code lacks error handling,which can lead to unexpected behaviour and crashes.Implement try-catch blocks to handle potential errors.",
                    icon: "FaFileAlt",
                  }}
                /> */}
                      {data?.critical
                        ? data.critical.length > 0
                          ? data.critical.map((item, index) => (
                              <CriticalBox
                                key={index}
                                data={{
                                  title: item?.title,
                                  description: item?.description,
                                  icon: item?.icon,
                                }}
                              />
                            ))
                          : ""
                        : ""}
                    </div>
                  </>
                ) : (
                  ""
                )
              ) : (
                ""
              )}

              {data?.warnings ? (
                data.warnings.length > 0 ? (
                  <>
                    <div className="warning_con">
                      <p className="font-[700] text-[#FFD9A3] ">WARNINGS</p>
                      {/* <WarningCom
                  data={{ title: "Unused variables (1)", line: "3" }}
                /> */}
                      {data?.warnings
                        ? data.warnings.length > 0
                          ? data.warnings.map((item, index) => (
                              <WarningCom
                                key={index}
                                data={{
                                  title: item?.title,
                                  line: item?.line,
                                }}
                              />
                            ))
                          : ""
                        : ""}
                    </div>
                  </>
                ) : (
                  ""
                )
              ) : (
                ""
              )}

              {data?.securityAudit?.metrics?.length > 0 && (
                <div className="securityaudit">
                  <p className="font-[700] text-gray-400">Security Audit</p>

                  <div className="flex items-center gap-[15px]">
                    {data.securityAudit.metrics.map((item, index) => (
                      <SecurityAudit
                        key={index}
                        data={{ name: item?.name, value: item?.value }}
                      />
                    ))}
                  </div>
                </div>
              )}
              {data?.complianceStandards?.length > 0 && (
                <div className="Compliance_Standards">
                  <p className="font-[700] text-gray-400 mb-2">
                    Compliance Standards
                  </p>

                  {data.complianceStandards.map((item, index) => (
                    <div key={index} className="flex items-center gap-[15px]">
                      <i
                        className={`text-[20px] ${
                          item.check === "yes"
                            ? "text-green-500"
                            : "text-gray-500"
                        }`}
                      >
                        {item.check === "yes" ? <LuCheck /> : <LuX />}
                      </i>

                      <p className="font-[200] text-[15px]">{item.name}</p>
                    </div>
                  ))}
                </div>
              )}
              {data?.proTip && (
                <div className="protip flex items-center gap-[15px] bg-[#101019]">
                  <div className="flex items-center gap-[15px]">
                    <i className="text-[17px] text-[var(--mint)]">
                      <LuLightbulb />
                    </i>
                    <p className="font-[700]">PRO TIP</p>
                  </div>

                  <p className="text-[14px] text-gray-500">{data.proTip}</p>
                </div>
              )}
            </div>
          ) : screen === "explain" ? (
            <div className="explain-content">
              <ReactMarkdown>{explainData}</ReactMarkdown>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default App;

// const sun = (a,b)=>{
//     return a+b
// }
