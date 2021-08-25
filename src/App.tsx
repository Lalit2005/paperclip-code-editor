import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import * as Tabs from "@radix-ui/react-tabs";
// @ts-ignore
import ReactSrcDocIframe from "react-srcdoc-iframe";

function App() {
  const [tab, setTab] = useState<"html" | "css" | "js">("html");
  const [htmlCode, setHtmlCode] = useState<string>("<p>Hello world</p>");
  const [cssCode, setCssCode] = useState<string>("html {}");
  const [jsCode, setJsCode] = useState<string>("console.log('Hello buddy')");

  // useEffect(() => {
  //   window.addEventListener("message", (event) => {
  //     console.log(event.data);
  //   });
  // }, []);

  const finalCode = {
    html: htmlCode,
    css: cssCode,
    js: jsCode,
  };

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="flex flex-col flex-wrap items-center justify-between md:flex-row">
        <div className="flex-1 w-full h-screen border-r-2 border-gray-900">
          {/* <div className="flex flex-row"> */}
          <Tabs.Root
            defaultValue="html"
            value={tab}
            // @ts-ignore
            onValueChange={(tab) => setTab(tab)}>
            <Tabs.List>
              <div className="flex items-center justify-around">
                <div>
                  <img
                    src="https://usepaperclip.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fimage%2Fpublic%2Flogos%2Flogo-transparent.60ff908df88fee4383cf587db29bed03.png&w=384&q=75"
                    alt="Paperclip"
                    className="w-36"
                  />
                </div>
                <Tabs.Trigger
                  className={`px-5 border py-1 bg-gray-100 hover:bg-gray-200 border-gray-300 rounded my-2 cursor-pointer ${
                    tab === "html" &&
                    "ring-2 ring-offset-1 shadow ring-gray-700"
                  }`}
                  value="html">
                  HTML
                </Tabs.Trigger>
                <Tabs.Trigger
                  className={`px-5 border py-1 bg-gray-100 hover:bg-gray-200 border-gray-300 rounded my-2 cursor-pointer ${
                    tab === "css" && "ring-2 ring-offset-1 shadow ring-gray-700"
                  }`}
                  value="css">
                  CSS
                </Tabs.Trigger>
                <Tabs.Trigger
                  className={`px-5 border py-1 bg-gray-100 hover:bg-gray-200 border-gray-300 rounded my-2 cursor-pointer ${
                    tab === "js" && "ring-2 ring-offset-1 shadow ring-gray-700"
                  }`}
                  value="js">
                  JS
                </Tabs.Trigger>
                <div>
                  <button
                    id="copy-btn"
                    className="px-5 py-1 my-2 bg-gray-100 border border-gray-300 rounded cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      const btn = document.getElementById("copy-btn");
                      window.navigator.clipboard.writeText(finalCode[tab]);
                      // @ts-ignore
                      btn.innerHTML = "Copied!! ✅";
                      setTimeout(() => {
                        // @ts-ignore
                        btn.innerHTML = "Copy code";
                      }, 1000);
                    }}>
                    Copy Code
                  </button>
                </div>
                <div>
                  <button
                    id="copy-btn"
                    className="px-5 py-1 my-2 bg-gray-900 border border-gray-300 rounded cursor-pointer hover:bg-gray-700 text-gray-50">
                    Save
                  </button>
                </div>
              </div>
            </Tabs.List>
            <Tabs.Content value="html">
              <div id="html-div">
                <Editor
                  height="95vh"
                  language="html"
                  theme="vs-dark"
                  value={htmlCode}
                  options={{
                    fontSize: "15px",
                    cursorWidth: "2px",
                    cursorSmoothCaretAnimation: true,
                  }}
                  // @ts-ignore
                  onChange={(val, e) => setHtmlCode(val)}
                />
              </div>
            </Tabs.Content>
            <Tabs.Content value="css">
              <div id="css-div">
                <Editor
                  height="95vh"
                  language="css"
                  theme="vs-dark"
                  value={cssCode}
                  options={{
                    fontSize: "15px",
                    cursorWidth: "2px",
                    cursorSmoothCaretAnimation: true,
                  }}
                  // @ts-ignore
                  onChange={(val, e) => setCssCode(val)}
                />
              </div>
            </Tabs.Content>
            <Tabs.Content value="js">
              <div id="js-div">
                <Editor
                  height="95vh"
                  language="javascript"
                  theme="vs-dark"
                  value={jsCode}
                  options={{
                    fontSize: "15px",
                    cursorWidth: "2px",
                    cursorSmoothCaretAnimation: true,
                  }}
                  // @ts-ignore
                  onChange={(val, e) => setJsCode(val)}
                />
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </div>
        <div className="flex-1 w-full h-full">
          <ReactSrcDocIframe
            srcDoc={`
						<!DOCTYPE html>
						<html>
							<head>
								<title>Hello Page</title>
								<style>${finalCode.css}</style>
							</head>
							<body>
									${finalCode.html}
									<script>${finalCode.js}</script>
							</body>
						</html>
						`}
            title="ReactSrcDocIframe"
            height="100%"
            allowFullScreen
            allowScriptAccess="always"
            frameBorder="0"
            style={{
              width: "100%",
              height: "100vh",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
