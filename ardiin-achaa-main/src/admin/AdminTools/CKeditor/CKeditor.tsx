// @ts-nocheck
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";


const CKeditor = (props) => {
  const IFRAME_SRC = "//cdn.iframe.ly/api/iframe";
  const API_KEY = "68bb4168460f7d057f8630";

  return (
    <div className="ckeditor">
      <div className="document-editor">
        <div className="document-editor__toolbar" />
        <div className="document-editor__editable-container">
          <div className="document-editor__editable">
            <CKEditor
              editor={DecoupledEditor}
              placeholder="Type the content here!"
              data={props.setText ? props.setText : ""}
              onChange={(event, editor) => {
                props.setCKEditorData(editor.getData());
              }}
              onReady={(editor) => {
                // Insert the toolbar before the editable area.
                editor.ui
                  .getEditableElement()
                  .parentElement.insertBefore(
                    editor.ui.view.toolbar.element,
                    editor.ui.getEditableElement()
                  );
              }}
              // onInit={(editor) => {
              //   window.editor = editor;

              //   // Add these two lines to properly position the toolbar
              //   const toolbarContainer = document.querySelector(
              //     ".document-editor__toolbar"
              //   );
              //   toolbarContainer.appendChild(editor.ui.view.toolbar.element);
              // }}
              config={{
                fontSize: {
                  options: [12, 14, "default", 18, 21, 23, 26, 28, 32],
                },
                ckfinder: {
                  uploadUrl: "http://cdplus.mn/backend/ckEditorIMG",
                },
                // image: {
                //   // Configure the available styles.
                //   styles: ["alignLeft", "alignCenter", "alignRight"],

                //   // Configure the available image resize options.
                //   resizeOptions: [
                //     {
                //       name: "imageResize:original",
                //       label: "Original",
                //       value: null,
                //     },
                //     {
                //       name: "imageResize:240",
                //       label: "Medium",
                //       value: "240",
                //     },
                //     {
                //       name: "imageResize:480",
                //       label: "Large",
                //       value: "480",
                //     },
                //   ],

                //   // You need to configure the image toolbar, too, so it shows the new style
                //   // buttons as well as the resize buttons.
                //   toolbar: [
                //     "imageStyle:alignLeft",
                //     "imageStyle:alignCenter",
                //     "imageStyle:alignRight",
                //     "|",
                //     "imageResize",
                //     "|",
                //     "imageTextAlternative",
                //   ],
                // },
                mediaEmbed: {
                  previewsInData: true,
                  providers: [
                    {
                      name: "iframely previews",
                      url: /.+/,
                      html: (match) => {
                        const url = match[0];
                        var iframeUrl =
                          IFRAME_SRC +
                          "?app=1&api_key=" +
                          API_KEY +
                          "&url=" +
                          encodeURIComponent(url);
                        // alternatively, use &key= instead of &api_key with the MD5 hash of your api_key
                        // more about it: https://iframely.com/docs/allow-origins

                        return (
                          // If you need, set maxwidth and other styles for 'iframely-embed' class - it's yours to customize
                          '<div class="iframely-embed">' +
                          '<div class="iframely-responsive">' +
                          `<iframe src="${iframeUrl}" ` +
                          'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>' +
                          "</iframe>" +
                          "</div>" +
                          "</div>"
                        );
                      },
                    },
                  ],
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CKeditor;
