import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../models/file-upload';

@Injectable({
  providedIn: 'root',
})

export class FileUploadService {
  private basePath = '/uploads';
  key!: string;
  name!: string;
  url!: string;
  file!: File;
  private downloadURL$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  constructor(private storage: AngularFireStorage) {}

  getDownloadURL(): Observable<string | null> {
    return this.downloadURL$.asObservable();
  }

  private setDownloadURL(downloadURL: string | null): void {
    this.downloadURL$.next(downloadURL);
  }

  pushFileToStorage(fileUpload: FileUpload): Observable<string | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    return new Observable<string | undefined>((observer) => {
      uploadTask
        .snapshotChanges()
        .pipe(
          finalize(() => {
            storageRef.getDownloadURL().subscribe(
              (downloadURL) => {
                fileUpload.url = downloadURL;
                fileUpload.name = fileUpload.file.name;
                this.saveFileData(fileUpload);
                observer.next(downloadURL);
                observer.complete();
              },
              (error) => {
                observer.error(error);
              }
            );
          })
        )
        .subscribe();
    });
  }

  pushFilesToStorage(files: FileUpload[]): Observable<string[] | undefined> {
    const filePaths = files.map((file) => `${this.basePath}/${file.file.name}`);
    const storageRefs = filePaths.map((filePath) => this.storage.ref(filePath));
    const uploadTasks = files.map((file, index) =>
      this.storage.upload(filePaths[index], file.file)
    );

    return new Observable<string[] | undefined>((observer) => {
      const downloadURLs: string[] = [];

      uploadTasks.forEach((uploadTask, index) => {
        uploadTask
          .snapshotChanges()
          .pipe(
            finalize(() => {
              storageRefs[index].getDownloadURL().subscribe(
                (downloadURL) => {
                  files[index].url = downloadURL;
                  files[index].name = files[index].file.name;
                  this.saveFileData(files[index]);
                  downloadURLs.push(downloadURL);

                  if (downloadURLs.length === files.length) {
                    observer.next(downloadURLs);
                    observer.complete();
                  }
                },
                (error) => {
                  observer.error(error);
                }
              );
            })
          )
          .subscribe();
      });
    });
  }

  private saveFileData(fileUpload: FileUpload): void {
    this.setDownloadURL(fileUpload.url);
  }

  deleteFileUpload(fileUpload: FileUpload): void {
    this.deleteFileData(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch((error) => console.log(error));
  }

  private deleteFileData(key: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.setDownloadURL(null);
      resolve();
    });
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}
