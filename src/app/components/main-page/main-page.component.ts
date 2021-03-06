import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';

import { faPlusSquare, faUser, faHome, faSearch, faDownload } from '@fortawesome/free-solid-svg-icons';

import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { EventsService } from 'src/app/services/events.service';
import { User } from 'src/app/models/user';
import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  faPlusSquare = faPlusSquare;
  faSearch = faSearch;
  faUser = faUser;
  faHome = faHome;
  faDownload = faDownload;

  isAtHomePage = false;
  isAtProfilePage = false;
  isAtSearchPage = false;
  user: User;
  deleteMode = false;
  selectedImages = 0;
  isLoading: boolean;
  isDownloading: boolean;

  routerEventsSubscription: Subscription;
  firebaseUserSubscription: Subscription;
  deletePhotosSubscription: Subscription;
  deleteModeSubscription: Subscription;
  isDeletingSubscription: Subscription;
  isDownloadingSubscription: Subscription;

  constructor(
    public eventsService: EventsService,
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
    private firebaseStorage: AngularFireStorage,
    private modalService: NgbModal) {

    this.routerEventsSubscription = router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.isAtHomePage = router.url === '/home';
        this.isAtProfilePage = router.url === '/';
        this.isAtSearchPage = router.url === '/search';
        // TODO possibly also set website tile here
      }
    });

  }

  ngOnInit() {
    this.firebaseAuth.auth.onAuthStateChanged(user => {
      if (!user) {
        this.router.navigateByUrl('/login');
      }
    });

    this.firebaseUserSubscription = this.firebaseAuth.user.subscribe(
      user => this.user = user
    );

    this.deletePhotosSubscription = this.eventsService.currentPhotosToDelete.subscribe(x => {
      this.deletePhotos(x);
    });

    this.deleteModeSubscription = this.eventsService.currentDeleteMode.subscribe(currentDeleteMode => {
      this.deleteMode = currentDeleteMode;
    });

    this.eventsService.currentSelectedImage.subscribe(currentSelectedImages => {
      this.selectedImages = currentSelectedImages.length;
    });

    this.isDeletingSubscription = this.eventsService.currentIsDeleting.subscribe(x => {
      this.isLoading = x;
    });

    this.isDownloadingSubscription = this.eventsService.currentIsDownloading.subscribe(x => {
      this.isDownloading = x;
    });
  }

  ngOnDestroy() {
    this.routerEventsSubscription.unsubscribe();
    this.firebaseUserSubscription.unsubscribe();
    this.deletePhotosSubscription.unsubscribe();
    this.deleteModeSubscription.unsubscribe();
    this.isDeletingSubscription.unsubscribe();
    this.isDownloadingSubscription.unsubscribe();
  }

  deletePhotos(fileNames: string[]) {
    fileNames.forEach(fileName => {
      this.eventsService.setIsDeleting(true);
      this.firebaseStorage.storage.ref().child(this.user.uid + '/' + fileName).delete()
        .then(() => {
          // File deleted successfully
          this.toastr.success('Post deleted', 'Success!', {
            closeButton: true,
            positionClass: 'toast-top-left'
          });

          this.eventsService.setIsDeleting(false);
          this.router.navigateByUrl('/');
        }).catch((error) => {
          // TODO show that an error occured
          this.eventsService.setIsDeleting(false);
          console.log('Error. File not deleted.');
        });
    });
  }

  openConfirmModal() {
    this.modalService.open(ConfirmDeleteModalComponent).result
      .then((result) => {
        this.eventsService.deletePhotos();
        this.eventsService.setDeleteMode(false);
        this.eventsService.resetSelectedImages();
      }, (reason) => {
        // modal closed
      });
  }

  onCancel() {
    this.eventsService.setDeleteMode(false);
    this.eventsService.resetSelectedImages();
  }

}
