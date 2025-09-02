import { Component } from '@angular/core';
import { Button } from '../Components/Button/button.component';
import { Image } from '../Components/Image/image.component';

// Component for the selection of pages
@Component ({
  selector: 'app-select-page',
  templateUrl: './selectedPage.component.html',
  imports: [Button],
  styleUrls: ['./header.component.css'],
})
export class ButtonsSelectPageComponent {}

// Component for the login and registration buttons
@Component({
  selector: "app-login-register",
  templateUrl: './loginRegister.component.html',
  imports: [Button],
  styleUrls: ['./header.component.css'],
})
export class RegisterLoginComponent {}

// Component for the header
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [ButtonsSelectPageComponent, RegisterLoginComponent, Image],
})
export class Header {}
