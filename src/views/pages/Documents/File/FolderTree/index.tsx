import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TreeItem, TreeView } from "@mui/lab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FolderIcon from "assets/images/folderIcon.svg";
import clsx from "clsx";
import { FC, SyntheticEvent, useEffect, useState, Fragment } from "react";
// import { ImFileText2 } from "react-icons/im";
import { IProfileDocumentStructure } from 'types/models/loan/normal/storage/ProfileDocument';
import ListTemplateStyle from "./style";
import Empty from 'views/components/layout/Empty';
import { useDispatch } from 'react-redux';
import { setBreadScrumb } from 'features/loan/normal/storage/ProfileDocument/action';
import TextTooltip from "views/components/base/TextTooltip";

export interface FolderTreeRef{}

export interface FolderTreeProps{
  options?: IProfileDocumentStructure[],
  onClick?(templateId: string, folderChildId?: string, folderId?: string, name?: string
    ): void, 
  selected?: string
}

const FolderTree: FC<FolderTreeProps> = props => {
  const { options, onClick, selected } = props;
  const dispatch = useDispatch()
  const classes = ListTemplateStyle();
 
  const [selectedParentFolder, setSelectedParentFolder] = useState<string | null>(null);
  const [selectedChildFolder, setSelectedChildFolder] = useState<string | null>(null);
  const [selectedChildFolderFile, setSelectedChildFolderFile] = useState<string | null>(null);
  const [selectedLastChildFolderFile, setSelectedLastChildFolderFile] = useState<string | null>(null);

  const [expandedNode, setExpandedNode] = useState<string[]>([]);
  const [selectedNode, setSelectedNode] = useState<string[]>([]);

  const labelIcon = () => {
    return <Box className="folderImg"><img src={FolderIcon} alt="folderIcon"/></Box>;
  };

  // const labelIconChild = () => {
  //   return <Box sx={{margin:"0 10px 0 5px"}} className="folderImg"><ImFileText2 /></Box>;
  // };

  // lv4
  const handleSelectLastItem = (lastItemId: string, lastItemName: string, itemId: string
    , folderChildId: string, folderId: string, name: string
    ) => {
    setSelectedChildFolder(itemId);
    setSelectedParentFolder(folderChildId);
    setSelectedLastChildFolderFile(lastItemId)
    setSelectedChildFolderFile(lastItemId);
    onClick && onClick(lastItemId
      , folderChildId, folderId, name
      );
  }
    // lv3
  const handleSelectItem = (templateId: string
    , folderChildId: string, folderId: string, name: string, hasChild: boolean
  ) => {
    setSelectedChildFolder(templateId);
    setSelectedParentFolder(folderChildId);
    !hasChild && setSelectedChildFolderFile(templateId);
    if (expandedNode.includes(templateId)) {
      setExpandedNode([folderChildId, folderId])
    } else {
      setExpandedNode([templateId, folderChildId, folderId])
    }
    !hasChild && onClick && onClick(templateId
      , folderChildId, folderId, name
    );
    
  }
  // lv2
  const handleSelectChildItem = (value: string , parentValue: string, hasChild: boolean, nameLv1: string, nameLv2: string)=>() => {
    setSelectedParentFolder(value);
    setSelectedChildFolder(parentValue);
    setSelectedChildFolderFile(value)
    if (expandedNode.includes(value)) {
      setExpandedNode([parentValue])
    } else {
      setExpandedNode([parentValue, value])
    }
    if(!hasChild){
      onClick && onClick(value);
      dispatch(setBreadScrumb([nameLv1, nameLv2]))
    }

  }
  // lv1
  const handleSelectRoot = (id: string, hasChild: boolean, name: string) => () => {
    setSelectedParentFolder(null);
    setSelectedChildFolder(null);
    expandedNode.includes(id) ? setExpandedNode([]) : setExpandedNode([id])
    if(!hasChild){
      onClick && onClick(id)
      dispatch(setBreadScrumb([name]))
    }

  }

  useEffect(() => {   
    if (selected?.length && [selected] !== selectedNode) {
      const newNode =[selected];
      let rootFolder= '' ;
      let parentFolder = ''
      let rootFolderName= '' ;
      let parentFolderName = '';
      let foldername = ''
      let lastFolder = ''
      let lastItemName = ''
      if(options?.length){
        
        for(let i of options){
          // parent folder lv1
          if(i.children.find(o=>o.id.toString() === selected)){
            parentFolder = i.id.toString() ?? ''
            parentFolderName = i.name ?? ''
            rootFolderName = i.children.find(o=>o.id.toString() === selected)?.name ?? ""
          }
          if(i.children?.length){

            for(let o of i.children){
              // child folder lv2
              if(o.children?.find(k=>k.id.toString() === selected)){
                rootFolder = o.id.toString()
                rootFolderName = o.name
                parentFolder = i.id.toString()
                parentFolderName = i.name
                foldername = o.children?.find(k=>k.id.toString() === selected)?.name ?? ''
                break;
              }
              if(o.children?.length){
                // lv3
                for(let k of o.children){
                  if(k.children.find(h=>h.id?.toString() === selected)){
                    rootFolder = o.id.toString()
                    rootFolderName = o.name
                    parentFolder = i.id.toString()
                    parentFolderName = i.name
                    foldername = k.name
                    lastFolder= k.id?.toString()
                    lastItemName= k.children.find(h=>h.id?.toString() === selected)?.name ?? ''
                    break;
                  }
                }
              }
            }
          }
        }
      }

      if (parentFolder) {
        setSelectedParentFolder(parentFolder);
        setSelectedChildFolder( lastFolder ? lastFolder : selected);
        if(!rootFolder){
          setExpandedNode([parentFolder]);
          dispatch(setBreadScrumb([parentFolderName,rootFolderName]))
        }else if(lastFolder){
          // have lv3 folder
          setExpandedNode([lastFolder, rootFolder, parentFolder]);
          dispatch(setBreadScrumb([parentFolderName,rootFolderName, foldername, lastItemName]))
        }else{
          setExpandedNode([rootFolder, parentFolder]);
          dispatch(setBreadScrumb([parentFolderName,rootFolderName, foldername]))
        }

      }
      setSelectedNode(newNode);


    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, options]);

  const handleToggle = (event: SyntheticEvent, nodeIds: string[]) => {
    setExpandedNode(nodeIds);
  };

  const handleSelect = (event: SyntheticEvent, nodeIds: string[]) => {
    setSelectedNode(nodeIds);
  };
  
  return <TreeView
      className={clsx(classes.root, 'scroll-tree')}
      aria-label="rich object"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ 
        height: 110, 
        flexGrow: 1, 
        maxWidth: 400, 
        overflowY: 'auto',
        
      }}
      expanded={expandedNode}
      onNodeToggle={handleToggle}
      selected={selectedNode}
      onNodeSelect={handleSelect}
    >
      
      {
        options?.length ? options.map((item) => {
          return <TreeItem 
            className={clsx(item.children?.find(i => i.id.toString() === selectedParentFolder) ? 'custom-selected' : '')}
            key={item.id} 
            nodeId={item.id.toString()}
            onClick={handleSelectRoot(item.id.toString(), !!item.children?.length, item.name)}
            label={
                <Box
                  className={clsx('tree-label', 'parent-folder')}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Box
                    className="tree-label-icon"
                    component={labelIcon}
                    color="inherit"
                    sx={{ mr: 1 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "inherit", flexGrow: 1 }}
                    className="tree-label-text"
                    id={item.id}
                  >
                    {item.name}
                  </Typography> 
                </Box>
              }
            >
              {
                item.children && item.children.length > 0 ? (
                  <Fragment>
                    {
                      item.children.map((i) => (
                        <TreeItem 
                          className={clsx(classes.subchildlist, 
                            i.children?.find(i => i.id.toString() === selectedChildFolder) 
                            ? 'custom-selected' 
                            : ''
                          )}
                          key = { i.id } 
                          nodeId = { i.id.toString()}
                          onClick = {handleSelectChildItem(i.id.toString(), item.id.toString(),!!i.children.length, item.name, i.name)}
                          label = {
                            <Box
                              className="tree-label"
                              sx={{ display: "flex", alignItems: "center" }}
                            >
                              <Box
                                className="tree-label-icon"
                                component={labelIcon}
                                color="inherit"
                                sx={{ mr: 1 }}
                              />
                              <Typography
                                variant="body2"
                                sx={{ fontWeight: "inherit", flexGrow: 1 }}
                                className="tree-label-text"
                              >
                                <TextTooltip> { i.name }</TextTooltip>
                               
                              </Typography>
                            </Box>
                          }>
                          {
                            i.children && i.children.length > 0 ? (
                              <Fragment>
                                {
                                  i.children.map((c) => (
                                    <TreeItem 
                                      className={clsx(classes.subchildlist,c.id.toString() === selectedChildFolderFile 
                                        ? 'custom-selected' 
                                        : '')} 
                                      key={`${c.id}`} 
                                      nodeId={`${c.id.toString()}`}
                                      onClick={() => handleSelectItem(c.id.toString()
                                        , i.id.toString(), item.id.toString(), c.name, !!c.children?.length
                                        )} 
                                      label={
                                        <Box
                                          className="tree-label"
                                          sx={{ display: "flex", alignItems: "center" }}
                                        >
                                          <Box
                                            className="tree-label-icon"
                                            component={labelIcon}
                                            color="inherit"
                                            sx={{ mr: 1 }}
                                          />
                                          <Typography
                                            variant="body2"
                                            sx={{ fontWeight: "inherit", flexGrow: 1 , padding:'6px 0px'}}
                                            className="tree-label-text"
                                            id={c.id}
                                          >
                                             <TextTooltip> { c.name }</TextTooltip>
                                           
                                          </Typography>
                                        </Box>
                                      } 
                                    >
                                                                {
                                        c.children && c.children.length > 0 ? (
                                          <Fragment>
                                            {
                                              c.children.map((d) => (
                                                <TreeItem
                                                  className={clsx(classes.subchildlist, d.id.toString() === selectedLastChildFolderFile
                                                    ? 'custom-selected'
                                                    : '')}
                                                  key={`${d.id}`}
                                                  nodeId={`${d.id.toString()}`}
                                                  onClick={() => handleSelectLastItem(d.id.toString(), d.name,c.id.toString()
                                                    , i.id.toString(), item.id.toString(), c.name
                                                  )}
                                                  label={
                                                    <Box
                                                      className="tree-label"
                                                      sx={{ display: "flex", alignItems: "center" }}
                                                    >
                                                      <Box
                                                        className="tree-label-icon"
                                                        component={labelIcon}
                                                        color="inherit"
                                                        sx={{ mr: 1 }}
                                                      />
                                                      <Typography
                                                        variant="body2"
                                                        sx={{ fontWeight: "inherit", flexGrow: 1, padding: '6px 0px' }}
                                                        className="tree-label-text"
                                                        id={d.id}
                                                      >
                                                         <TextTooltip> {d.name}</TextTooltip>
                                                        
                                                      </Typography>
                                                    </Box>
                                                  }
                                                />
                                              ))
                                            }
                                          </Fragment>
                                        ) : null
                                      }
                                    </TreeItem>
                                  ))
                                }
                              </Fragment>
                            ) : null
                          }
                        </TreeItem>
                      ))
                    }
                  </Fragment>
                ) : ''
              }

          </TreeItem>
        }) : <Empty >Chưa có dữ liệu</Empty>
      }
    </TreeView>


}

export default FolderTree;