import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AdminService } from '../../../core/service/admin.service';
import { LocalStorageService } from '../../../core/service/localstorage.service';

import { Globalfunction } from '../../../core/global/globalfunction';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;
    public UserLevelName: string;
    public UserName: string;
    public profileImage: string;
    public globalfunction: Globalfunction = new Globalfunction();

    constructor(
        private translate: TranslateService, 
        public router: Router, 
        private localStorageService : LocalStorageService,
        private adminService: AdminService
    ) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
        this.UserName = this.localStorageService.getItem('UserName');
        this.UserLevelName = this.localStorageService.getItem('UserLevelName');
    }

    ngOnInit() {
        console.log(this.UserLevelName)
        this.pushRightClass = 'push-right';
        this.adminService.getProfileImage().subscribe(x => {
            this.profileImage = x;
        });
        console.log(this.profileImage);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}