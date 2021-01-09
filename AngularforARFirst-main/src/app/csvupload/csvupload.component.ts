import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpResponse, HttpEventType } from "@angular/common/http";
import { UploadFileService } from "./../Services/upload-file.service";
import { MessageService, PrimeNGConfig } from "primeng/api";
import { FileUpload } from "primeng/fileupload";

@Component({
  selector: "app-csvupload",
  templateUrl: "./csvupload.component.html",
  styleUrls: ["./csvupload.component.scss"],
  providers: [MessageService],
})
export class CsvuploadComponent implements OnInit {
  @ViewChild("csvFile", { static: true }) public csvFile: FileUpload;

  title = "File-Upload-Save";

  selectedFiles: FileList;
  currentFileUpload: File;
  loading: boolean = true;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;
  me: number = 0; //count of metadata
  pe: number = 0; //count of product
  uploadClicked: number = 0; //countof upload clicking
  uploadSuccess: number = 0; //upload success count
  metadataUrl: any;
  pdtUrl: {}[] = [];
  https: any;
  nameofFile: string;
  countTwoEnabled: number = 0;
  selectFileFlag: boolean = false;
  counter: number = 0;
  uploadedFiles: any[] = [];
  public fileSelected = false;
  public CSVFileName: string = "";
  public csvCols: any[];
  public display: boolean = false;

  constructor(
    private uploadService: UploadFileService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.primengConfig.ripple = true;
    this.csvCols = [
      {
        header: "SNo.",
        field: "sno",
      },
      {
        header: "Name of Entity",
        field: "name",
      },
      {
        header: "Service Url",
        field: "productUrl",
      },
      {
        header: "MetaData Url",
        field: "metaDataUrl",
      },
    ];
    this.pdata();
  }

  change($event) {
    this.changeImage = true;
  }

  changedImage(event) {
    this.selectedFile = event.target.files[0];
  }

  onFileSelect(event) {
    debugger;
    if (this.csvFile.hasFiles()) {
      this.selectedFile = this.csvFile.files[0];
      this.fileSelected = true;
    }
  }
  onFileRemoved() {
    debugger;
    this.fileSelected = false;
  }

  csvFormClear() {
    this.CSVFileName = "";
    this.csvFile.clear();
  }

  upload() {
    this.uploadClicked = this.uploadClicked + 1;
    this.progress.percentage = 0;
    this.uploadService
      .pushFileToStorage(this.selectedFile, this.CSVFileName)
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress.percentage = Math.round(
              (100 * event.loaded) / event.total
            );
          } else if (event instanceof HttpResponse) {
            this.csvFormClear();
            this.uploadSuccess = 0;
            console.log(HttpResponse);
            this.display = true;
            this.messageService.add({
              severity: "success",
              summary: "File Uploaded",
              detail: "Upload Successful",
            });
            this.pdata();
          }
        },
        (error) => {
          if (error.status === 417) {
            this.uploadSuccess = 1;

            this.messageService.add({
              severity: "error",
              summary: "Duplicate File",
              detail: "Already Exists",
            });
          }
        }
      );

    //);
  }
  metadata() {
    this.me = this.me + 1;
    this.uploadService.getMetadata().subscribe((result: any) => {
      console.log(result);
      this.metadataUrl = result;
    });
  }
  pdata() {
    this.pe = this.pe + 1;

    this.uploadService.getProducts().subscribe((result: any) => {
      console.log("Result " + result);
      this.pdtUrl = result.map((csvField) => {
        let myobj = {
          name: csvField.name,
          productUrl: "Product Url",
          metaDataUrl: "MetaData Url",
          pUrl: "http://ec2-52-14-55-223.us-east-2.compute.amazonaws.com:8080/cars.svc/"+csvField.name,
          
          mUrl:
            "http://ec2-52-14-55-223.us-east-2.compute.amazonaws.com:8080/cars.svc/"+csvField.name+"/$metadata",
        
        };
        return myobj;
      });
      this.loading = false;
    });
  }
  selectFile(event) {
    this.selectFileFlag = true;
    this.selectedFiles = event.target.files;
  }
}
