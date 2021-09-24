import { Component, OnInit } from '@angular/core';
import { parse } from '@fortawesome/fontawesome-svg-core';
import { loadModules } from 'esri-loader';
import { ApiService } from 'src/app/services/api.services';
import { ParentChildCommunicationService } from 'src/app/services/childToParentCommunication/child-parent-communication.service';


@Component({
  selector: 'app-facility-map',
  templateUrl: './facility-map.component.html',
  styleUrls: ['./facility-map.component.css']
})
export class FacilityMapComponent implements OnInit {

  hotspotlist: any;
  facilityId: any;
  facilityName: any;
  facilityIcon:any;
  url='http://164.52.208.77:3000/';
  facility: number;


  user_id: any;
  token: any;
  DATA: any;


  constructor(private service: ApiService, private messageService: ParentChildCommunicationService) { }

  ngOnInit(): void {


    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');

 


    this.facilityId = localStorage.getItem('facility_id');
    //this.facilityName = localStorage.getItem('facility_name');
    //this.facilityIcon=localStorage.getItem('facility_icon');
    this.facility = parseInt(this.facilityId);
    this.DATA = {
      'user_id': this.user_id,
      'token': this.token,
      'id':this.facility
    }

    


    this.service.getFacilityByID(this.DATA).subscribe(res => {
  
      this.facilityName=res.data[0].facility_type;
      this.facilityIcon=res.data[0].facility_image;
      this.hotspotlist = res.data[0].facility_data;
     // console.log(this.hotspotlist);
      if (this.hotspotlist.length > 0) {

        this.initDefaultMap(this.hotspotlist);
      }

    });


  }

  ngAfterViewInit(): void {
  }

  gotoDashboard() {

    let id = '0';
    let componentName = "Dashboard"
    this.messageService.setMessage(id, componentName);

  }

  private async initDefaultMap(data: any): Promise<void> {


    const hotspots = data


    const [Map,
      MapView,
      FeatureLayer,
      SimpleMarkerSymbol,
      Graphic, GraphicsLayer,
      PictureMarkerSymbol,
      Point, WebStyleSymbol, Track] = await loadModules(['esri/Map',
        'esri/views/MapView', 'esri/layers/FeatureLayer', 'esri/symbols', 'esri/Graphic',
        'esri/layers/GraphicsLayer', "esri/symbols/PictureMarkerSymbol", "esri/geometry/Point",
        "esri/symbols/WebStyleSymbol", "esri/widgets/Track"]);



    var map = new Map({
      basemap: "streets-navigation-vector"
      // basemap: "topo-vector"
    });

    var view = new MapView({
      container: "viewDiv",
      map: map,
      zoom: 9,
      center: [76.9366, 8.5241] // longitude, latitude
    });

    // =====================================================================================================


    // Create an instance of the Track widget
    // and add it to the view's UI
    var track = new Track({
      view: view
    });

    view.ui.add(track, "top-left");

    view.when(function () {

      track.start();
    });





    var marker = {
      type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
      color: [226, 119, 40]
    };


    var webStyleSymbol = new WebStyleSymbol({
      name: "tear-pin-1",
      styleName: "Esri2DPointSymbolsStyle"
    });



    switch (this.facility) {
      case 1:

        webStyleSymbol = new WebStyleSymbol({
          name: "gas-station",
          styleName: "Esri2DPointSymbolsStyle"
        });

        break;
      case 2:

        webStyleSymbol = new WebStyleSymbol({
          name: "police-station",
          styleName: "Esri2DPointSymbolsStyle"
        });

        break;

      case 3:
        webStyleSymbol = new WebStyleSymbol({
          name: "hospital",
          styleName: "Esri2DPointSymbolsStyle"
        });
        break;
      case 4:
        webStyleSymbol = new WebStyleSymbol({
          name: "restroom",
          styleName: "Esri2DPointSymbolsStyle"
        });
        break;
      case 5:
        webStyleSymbol = new WebStyleSymbol({
          name: "tear-pin-1",
          styleName: "Esri2DPointSymbolsStyle"
        });
        break;
      case 6:
        webStyleSymbol = new WebStyleSymbol({
          name: "hospital",
          styleName: "Esri2DPointSymbolsStyle"
        });
        break;
      default:
        webStyleSymbol = new WebStyleSymbol({
          name: "tear-pin-1",
          styleName: "Esri2DPointSymbolsStyle"
        });

    }

    function addgraphics(a: any, b: any) {

      var markerPoint = new Point({ x: a, y: b });
      var storepoint = new Graphic(markerPoint, webStyleSymbol);

      var layer = new GraphicsLayer();
      layer.add(storepoint);
      map.add(layer);
    }


    view.when(function () {

      for (var i = 0; i < hotspots.length; i++) {

        addgraphics(hotspots[i].longitude, hotspots[i].latitude);

      }

    });

  }




}
