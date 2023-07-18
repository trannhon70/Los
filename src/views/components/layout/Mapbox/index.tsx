/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect,useRef, useState,   ForwardRefRenderFunction,useImperativeHandle, forwardRef, memo} from 'react';
import {GeoJSONSource } from 'mapbox-gl';
import ReactMapGL, {InteractiveMap, FlyToInterpolator,PointerEvent} from 'react-map-gl';
import clsx from 'clsx';
import mapboxgl from 'mapbox-gl';
import useBranchGeojson from 'app/hooks/useBranchGeojson';

interface IViewport {
    latitude: number;
    longitude: number;
    zoom: number;
}
export interface MapBoxRef {
    disableHighLightMarket(): void;
    zoomMapbox(lat:number,lon:number,level:number):void;
    hightLightMarket(id:string): void;
    updateBound(left:number,right:number,top:number,bottom:number): void;
    updateZoneData(list:Array<string>,isZone:boolean): void;
    visibleZone(zone:string):void;
}

interface MapBoxProps {
    className?: string;
    children?: React.ReactNode;
    width?:string;
    height?:string;
    lon?: number;
    lat?: number;
    zoomTo?: boolean;
    zoomLevel?:number;
    disableInteractive?:boolean;
    firstInitBound?: [[number, number], [number, number]] ;
    onClickMap?: ((event: PointerEvent) => void)| undefined;
}

interface MapboxComponent extends ForwardRefRenderFunction<MapBoxRef,MapBoxProps> { }
// interface MapboxComponent extends React.FunctionComponent<MapBoxProps> { }
const BLOCKED = {
    dragPan: false,
    dragRotate: false,
    scrollZoom: false,
    touchZoom: false,
    touchRotate: false,
    keyboard: false,
    doubleClickZoom: false
};

const Mapbox: MapboxComponent = (props,ref) => {
    const { children,width,height,className, disableInteractive, onClickMap } = props
    const LAYOUT_MAP = {
        TOKEN:  
            "pk.eyJ1IjoiYnJpYW5iYW5jcm9mdCIsImEiOiJsVGVnMXFzIn0.7ldhVh3Ppsgv4lCYs65UdA",
        STYLE: "https://images.minerva.vn/Style/scb_dwh",
    };
    const bounds = [
        [90, 7],   // Southwest coordinates
        [130, 25]   // Northeast coordinates
    ];

    const [viewport, setViewport] = useState<any>({
        longitude: 107.6591, //y
        latitude: 15.5934,
        minZoom: 5,
        pitch: 0,
        transitionDuration: 1000,
        transitionInterpolator: new FlyToInterpolator()
    });
    
    const {branchGeojson} = useBranchGeojson();
    const [listZone,setListZone] = useState<Array<string>>([]);
    const [settings, setSettings] = useState({});
    const [currentHighlight,setCurrentHighlight] = useState('');
    const map = useRef<InteractiveMap>(null)
    useEffect(()=>{
        if(disableInteractive){
            setSettings(BLOCKED);
        }
    },[disableInteractive])
    
    useEffect(()=>{
        if(branchGeojson){
           let source =  map.current?.getMap()?.getSource('branchscb') as GeoJSONSource
           source?.setData(branchGeojson)
           map.current?.forceUpdate()
        }
    },[branchGeojson])

    useImperativeHandle(ref, () => ({
        disableHighLightMarket(){
            disableHighLightMarket()
        },
        zoomMapbox(lat:number,lon:number,level:number){
            zoomMapbox(lat,lon,level);
        },
        hightLightMarket(id:string){
            hightLightMarket(id);
        },
        updateBound(left:number,right:number,top:number,bottom:number){
            fitBounds(left,right,top,bottom);
        },
        updateZoneData(list:Array<string>,isZone:boolean){
            const mapbox = map.current?.getMap();
            clearZoneLayer();
            setListZone(list);

            if(mapbox?.isStyleLoaded()||mapbox?.loaded()){
                updateZoneLayer(list,isZone);
            }else{
                mapbox?.on('load',()=>{
                    updateZoneLayer(list,isZone);
                })
            }
        },
        visibleZone(zone:string){
            visibleZone(zone);
        }
    }));
    const clearZoneLayer=()=>{
        if(listZone.length>0){
            const mapbox = map.current?.getMap();
            listZone.forEach((item)=>{
                const layerID =  item==='ALL'?'label-scb-index':`layer-branchscb-${item}`
                if(mapbox?.getLayer(layerID)){
                    mapbox?.removeLayer(layerID)
                }
            })
        }
    }
    const updateZoneLayer=(list:Array<string>,isZone:boolean)=>{
        // try{
            const mapbox = map.current?.getMap();
            if(mapbox?.getLayer('label-scb-index')){
                mapbox?.removeLayer('label-scb-index')
            }
            list.forEach((item)=>{
                const layerID =  item==='ALL'?'label-scb-index':`layer-branchscb-${item}`
                if (!mapbox?.getLayer(layerID)) {
                    mapbox?.addLayer({
                        id: layerID,
                        source: "branchscb",
                        type: "symbol",
                        "minzoom": 6,
                        "layout": {
                            "text-field": "{name}",
                            "text-transform": "uppercase",
                            "text-font": [ "Roboto Condensed Bold" ],
                            "text-size": {
                              "base": 1,
                              "stops": [
                                [ 13, 10 ],
                                [ 20, 13 ]
                              ]
                            },
                            "text-anchor": "top",
                            "text-padding": 0,
                            "text-letter-spacing": 0.01,
                            "text-pitch-alignment": "viewport",
                            "text-offset": [ 0, 1.2 ],
                            "icon-image": "scb",
                            "icon-padding": 0,
                            "icon-allow-overlap": false
                          },
                        "paint": {
                            "text-color":[
                                'case', ['boolean', ['feature-state', 'clicked'], false],
                                '#eb0029',
                                '#666',
                            ],
                            "text-halo-color": "#fff",
                            "text-halo-width": 0.3,
                        },
                        'filter': item==="ALL"?['in', isZone?'zone_id':'area_id',...list]:['==', isZone?'zone_id':'area_id', item]    
                    });
                    mapbox?.setLayoutProperty(layerID,'visibility','none');
                }
            });
        
            map.current?.forceUpdate();
            setTimeout(()=>{
                mapbox?.fitBounds([[100,8],[110,25]],{padding: 20});
                visibleZone('ALL');   
            },500)
                 
          
    }
   
    const visibleZone = (zone:string)=>{
        const mapbox = map.current?.getMap();
        if(mapbox?.isStyleLoaded()||mapbox?.loaded()){
            if(zone==='ALL'){
                listZone.forEach((item)=>{
                    if(item!=='ALL'){
                        const layerID = `layer-branchscb-${item}`
                        if(mapbox?.getLayer(layerID)){
                            mapbox?.setLayoutProperty(layerID,'visibility','none');
                        }
                    }
                })
                if(mapbox?.getLayer('label-scb-index')){
                    mapbox?.setLayoutProperty('label-scb-index','visibility','visible');
                }
            }else{
                listZone.forEach((item)=>{
                    if(item!=='ALL'){
                        const layerID = `layer-branchscb-${item}`
                        if(mapbox?.getLayer(layerID)){
                            mapbox?.setLayoutProperty(layerID,'visibility',item===zone?'visible':'none');
                        }
                    }
                })
                if(mapbox?.getLayer('label-scb-index')){
                    mapbox?.setLayoutProperty('label-scb-index','visibility','none');
                }
            }
        }else{
            mapbox?.on("load",()=>{
                if(zone==='ALL'){
                    listZone.forEach((item)=>{
                        if(item!=='ALL'){
                            const layerID = `layer-branchscb-${item}`
                            if(mapbox?.getLayer(layerID)){
                                mapbox?.setLayoutProperty(layerID,'visibility','none');
                            }
                        }
                    })
                    if(mapbox?.getLayer('label-scb-index')){
                        mapbox?.setLayoutProperty('label-scb-index','visibility','visible');
                    }
                }else{
                    listZone.forEach((item)=>{
                        if(item!=='ALL'){
                            const layerID = `layer-branchscb-${item}`
                            if(mapbox?.getLayer(layerID)){
                                mapbox?.setLayoutProperty(layerID,'visibility',item===zone?'visible':'none');
                            }
                        }
                    })
                    if(mapbox?.getLayer('label-scb-index')){
                        mapbox?.setLayoutProperty('label-scb-index','visibility','none');
                    }
                }
            });
        }
       
    }
    const fitBounds=(left:number,right:number,top:number,bottom:number)=>{
        if( map.current!==null){
            const mapbox = map.current?.getMap()
            const bounds = new mapboxgl.LngLatBounds([left,bottom],[right,top]);
            mapbox?.fitBounds(bounds,{padding: 60}); 
        }
    }
    const zoomMapbox=(lat:number,lon:number,level:number)=>{
        setViewport({
            ...viewport,
            longitude:lon, latitude:lat, zoom:level,
            transitionDuration: 1000,
            transitionInterpolator: new FlyToInterpolator(),
        });
    }
    
    const disableHighLightMarket=()=>{
        if( map.current!==null){
            const mapbox = map.current?.getMap()
            if(currentHighlight){
                mapbox?.setFeatureState({source:'branchscb', id:currentHighlight}, {clicked:false})
                setCurrentHighlight('');
            }
        }
    }

    const hightLightMarket=(id:string)=>{
        if( map.current!==null){
            const mapbox = map.current?.getMap()
            if(currentHighlight){
                mapbox?.setFeatureState({source:'branchscb', id:currentHighlight}, {clicked:false})
                setCurrentHighlight('');
            }
            const source =mapbox?.querySourceFeatures("branchscb")
            const feature =  source.find((f)=>f.properties?.code === id)
            if(!!feature){
                const id = feature.id? feature.id.toString():''
                mapbox?.setFeatureState({source:'branchscb', id:id}, {clicked:true})
                setCurrentHighlight(id)
            }else{
                setTimeout(()=>{
                    try{
                        const mapbox1 = map.current?.getMap()
                        const sourceF =mapbox1?.querySourceFeatures("branchscb")
                        const featureF =  sourceF?.find((f)=>f.properties?.code === id)
                        if(!!featureF){
                            const idF = featureF.id? featureF.id.toString():''
                            mapbox1?.setFeatureState({source:'branchscb', id:id}, {clicked:true})
                            setCurrentHighlight(idF)
                        }
                    }catch(e){

                    }
                },1300)
            }
        }
    }
    // eslint-disable-next-line
    const changeDefaultMarketLayer=()=>{
        const mapbox = map.current?.getMap()
        mapbox?.removeLayer('label-scb-index')
        // updateLayer(listZone,isZone);
        mapbox?.addLayer({
            id: "label-scb-index",
            source: "branchscb",
            type: "symbol",
            "minzoom": 6,
            "layout": {
                "text-field": "{name}",
                "text-transform": "uppercase",
                "text-font": [ "Roboto Condensed Bold" ],
                "text-size": {
                  "base": 1,
                  "stops": [
                    [ 13, 10 ],
                    [ 20, 13 ]
                  ]
                },
                "text-anchor": "top",
                "text-padding": 0,
                "text-letter-spacing": 0.01,
                "text-pitch-alignment": "viewport",
                "text-offset": [ 0, 1.2 ],
                "icon-image": "scb",
                "icon-padding": 0,
                "icon-allow-overlap": false
              },
            "paint": {
                "text-color":[
                    'case', ['boolean', ['feature-state', 'clicked'], false],
                      '#eb0029',
                      '#666',
                  ],
                "text-halo-color": "#fff",
                "text-halo-width": 0.3,
            }       
        });
     
    }
    
    useEffect(()=>{
        const mapbox = map.current?.getMap()
        mapbox?.on("load",()=>{
            mapbox?.resize();
            mapbox?.fitBounds([[100,8],[110,25]],{padding: 20});
            
          });        
    },[])

    return <ReactMapGL
        ref={map}
        {...viewport}
        width={width}
        height={height}
        className={ clsx('mscb-mapbox', className) }
        {...settings}
        onClick={onClickMap}
        onViewportChange={(viewport: IViewport) => setViewport(viewport)}
        mapboxApiAccessToken={LAYOUT_MAP.TOKEN}
        mapStyle={ LAYOUT_MAP.STYLE }
        mapOptions={{
            container:'scb-mapbox-container',
            maxBounds: bounds
        }}
    >
        {children}
        
    </ReactMapGL>
}

export default memo(forwardRef(Mapbox));
