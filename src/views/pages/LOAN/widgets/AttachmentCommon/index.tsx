import React, { useEffect, useState } from "react";
import {
  ILOANModalDynamicDocument,
  ILOANModalDynamicFile,
} from "types/models/loan/normal/configs/Document";
import AttachmentDynamic, { IActionsDynamicModal } from "./AttachmentDynamic";
import { generateUUID } from "utils";
import { IDocDynamicOption } from "./AttachmentDynamic/hook";
const testData: ILOANModalDynamicDocument[] = [
  {
    uuid: generateUUID(),
    document_id: '1',
    document_name: "Kha_child_child",
    hasSubDoc: true,
    childs: [
      {
        uuid: generateUUID(),
        document_id: '1.1',
        document_name: "Kha_child",
        hasSubDoc: true,
        childs: [
          {
            uuid: generateUUID(),
            document_id: '1.1.1',
            document_name: "Kha_child_child",
            childs: [
              {
                file_id: 1,
                content_type: "img",
                created_at: 0,
                created_by: "Kha dep trai",
                uuid: generateUUID(),
                name: "halo",
                description: "",
                display_order: 1,
              },
            ] as ILOANModalDynamicFile[],
          },
          {
            uuid: generateUUID(),
            document_id: '1.1.2',
            document_name: "Kha_child_child",
            childs: [] as ILOANModalDynamicFile[],
          },
        ],
      },
      {
        uuid: generateUUID(),
        document_id: '1.2',
        document_name: "Kha_child",
        childs: [
          {
            file_id: 1,
            content_type: "",
            created_at: null,
            created_by: "",
            created_by_name: "",
            updated_at: null,
            updated_by: "",
            updated_by_name: "",
            uuid: generateUUID(),
            name: "",
            description: "",
            display_order: 1,
          },
        ],
      },
      {
        uuid: generateUUID(),
        document_id: '1.3',
        document_name: "Kha_child",
        childs: [],
      },
    ],
  },
];
const optionTest:IDocDynamicOption[] = [
    {
      value: "1",
      label: "1",
      subDocs: [
        {
          label: "1.1",
          value: "1.1",
          subDocs: [
            {
              label: "1.1.1",
              value: "1.1.1",
            },
            {
              label: "1.1.2",
              value: "1.1.2",
            },
            {
              label: "1.1.3",
              value: "1.1.3",
            },
            {
              label: "1.1.4",
              value: "1.1.4",
            },
            {
              label: "1.1.5",
              value: "1.1.5",
            },
          ],
        },
        {
          label: "1.2",
          value: "1.2",
          subDocs: [
            {
              label: "1.2.1",
              value: "1.2.1",
            },
            {
              label: "1.2.2",
              value: "1.2.2",
            },
            {
              label: "1.2.3",
              value: "1.2.3",
            },
          ],
        },
        {
          label: "1.3",
          value: "1.3",
          subDocs: [
            {
              label: "1.3.1",
              value: "1.3.1",
            },
            {
              label: "1.3.2",
              value: "1.3.2",
            },
            {
              label: "1.3.3",
              value: "1.3.3",
            },
          ],
        },
      ],
    },
    {
      value: "2",
      label: "2",
      subDocs: [
        {
          label: "2.1",
          value: "2.1",
          subDocs: [
            {
              label: "2.1.1",
              value: "2.1.1",
            },
            {
              label: "2.1.2",
              value: "2.1.2",
            },
            {
              label: "2.1.3",
              value: "2.1.3",
            },
            {
              label: "2.1.4",
              value: "2.1.4",
            },
            {
              label: "2.1.5",
              value: "2.1.5",
            },
          ],
        },
        {
          label: "3.2",
          value: "3.2",
          subDocs: [
            {
              label: "3.2.1",
              value: "3.2.1",
            },
            {
              label: "3.2.2",
              value: "3.2.2",
            },
            {
              label: "3.2.3",
              value: "3.2.3",
            },
          ],
        },
        {
          label: "3.3",
          value: "3.3",
          subDocs: [
            {
              label: "3.3.1",
              value: "3.3.1",
            },
            {
              label: "3.3.2",
              value: "3.3.2",
            },
            {
              label: "3.3.3",
              value: "3.3.3",
            },
          ],
        },
      ],
    },
  ]
export default function AttachmentDynamicModal({ open }: { open: boolean }) {
  const [data, setData] = useState<ILOANModalDynamicDocument[]>([]);
  useEffect(() => {
    setData([]);
  }, []);
  const action: IActionsDynamicModal = {
    add: {
      doc: ({ uuids, action_uuid }) => {
        console.log("DOC uuids, action_uuid", uuids, action_uuid);
      },
      file: ({ uuids, action_uuid }) => {
        console.log("FILE uuids, action_uuid", uuids, action_uuid);
      },
    },
    remove: {
      all: () => {
        console.log("remove ALL");
      },
      doc: ({ uuids, action_uuid }) => {
        console.log("DOC uuids, action_uuid", uuids, action_uuid);
      },
      file: ({ uuids, action_uuid }) => {
        console.log("FILE uuids, action_uuid", uuids, action_uuid);
      },
    },
    update: {
      doc: ({ uuids, action_uuid }, value) => {
        console.log("UPDATE_DOC uuids, action_uuid", value, uuids, action_uuid);
      },
      fileDesc: ({ uuids, action_uuid }, value) => {
        console.log(
          "fileDesc UPDATE_DOC uuids, action_uuid",
          value,
          uuids,
          action_uuid
        );
      },
    },
    chooseFile: ({ uuids, action_uuid }, dataFiles) => {
      console.log(
        "chooseFile UPDATE_DOC uuids, action_uuid",
        dataFiles,
        uuids,
        action_uuid
      );
    },
    onClose: () => undefined,
    onSave: () => undefined,
  };
  return (
    <>
      <AttachmentDynamic
        open={open}
        dataDocs={data}
        actions={action}
        docOptions={optionTest}
      />
    </>
  );
}
