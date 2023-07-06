import {ViewChild, Component, AfterViewInit, ElementRef, OnInit, AfterViewChecked,} from '@angular/core';

@Component({
  selector: 'app-image-page',
  templateUrl: './image-page.component.html',
  styleUrls: ['./image-page.component.scss']
})
export class ImagePageComponent implements OnInit {
  @ViewChild('image') image?: ElementRef;
  @ViewChild('sectionsItem') sectionsItem?: ElementRef;

  fileUrl = '';
  arr: any = [];
  imageWidth = 0;
  imageHeight = 0;
  results: any = {};
  polygons: any[] = [];
  texts: [] = [];
  activeIndex: number = -1;
  fileName: string = '';

  handleFile(event: any) {

    const file: File = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (e: any) => {
        this.fileUrl = e.target.result;
        this.arr.push(this.fileUrl);
        this.fileName = file.name;
      };
     }
  }

  setupPositions(array: number[]): any[] {
    const points: any[] = [];

    /**
     * Set four points from pixel positioning
     */

    for (let i = 0; i < array.length; i++) {
      if (i % 2 === 0) {
        points.push({
          index: points.length,
          x: array[i],
          y: array[i + 1]
        });
      }
    }

    /**
     * Sorting params to find lowest Y params to find top positions
     * from top to bottom
     */

    points.sort(function(a, b) {
      return parseFloat(a.y) - parseFloat(b.y);
    });

    /**
     * Sorting two top dots by X to find positions
     * from left to right
     */

    const searchingTop = [points[0], points[1]];
    searchingTop.sort(function(a, b) {
      return parseFloat(a.x) - parseFloat(b.x);
    });

    /**
     * Sorting two bottom dots by X to find positions
     * from left to right
     */

    const searchingBottom = [points[2], points[3]];
    searchingBottom.sort(function(a, b) {
      return parseFloat(a.x) - parseFloat(b.x);
    });

    /**
     * Forming dot positions by round from top left, top right
     * bottom right and bottom left
     */

    return [searchingTop[0], searchingTop[1], searchingBottom[1], searchingBottom[0]];
  }

  ngOnInit() {
  }

  loadImage() {
    this.imageWidth = this.image?.nativeElement.naturalWidth;
    this.imageHeight = this.image?.nativeElement.naturalHeight;
  }

  onFileLoad(e:any) {
    const file: File = e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = ((theFile) => {
        return (e:any) => {
          try {
            const json = JSON.parse(e.target.result);
            const resSTR = JSON.stringify(json);
            this.results = JSON.parse(resSTR);
            const value = this.results.predictions;

            /**
             * Setup points because points set in random positioning like polygon
             */

            this.polygons = value.det_polygons.map((elem: any) => {
              return this.setupPositions(elem);
            });
            this.texts = value.rec_texts;
          } catch (error) {
            alert('error = ' + error);
          }
        };
      })(file);
      fileReader.readAsText(file);
    }
  }

  changeElem(index: number) {
    this.activeIndex = index;
  }

  scrollElem(index: number) {
    if(this.sectionsItem) {
      const sectionsItem = this.sectionsItem.nativeElement;
      const element = sectionsItem.querySelector('.info__data' + index);
      if (element) {
        const parentBCR = sectionsItem.getBoundingClientRect();
        sectionsItem.scrollTop = element.offsetTop - parentBCR.top ;
      }
    }
  }

}
