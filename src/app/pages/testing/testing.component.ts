import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OptionsModel, FormConfig, CONTROL_TYPE, ToastService } from 'ng-base-lib';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-testing',
  standalone: false,
  templateUrl: './testing.component.html',
  styleUrl: './testing.component.scss',
})
export class TestingComponent {
  items: MenuItem[] = [
    {
      label: 'Home',
      routerLink: '/'
    },
    {
      label: 'Form',
      routerLink: '/form'
    }
  ];
  options: OptionsModel[] = [
    {
      label: 'Option 1',
      value: 'option1',
    },
    {
      label: 'Option 2',
      value: 'option2',
    },
    {
      label: 'Option 3',
      value: 'option3',
    },
  ];

  formConfig: FormConfig[] = [
    {
      label: 'username',
      type: CONTROL_TYPE.Textbox,
      layoutDefine: {
        column: 0,
        row: 0,
      },
    },
    {
      label: 'gender',
      type: CONTROL_TYPE.Dropdown,
      layoutDefine: {
        column: 1,
        row: 0,
      },
      options: this.options
    },
    {
      label: 'checkbox',
      type: CONTROL_TYPE.Checkbox,
      layoutDefine: {
        column: 0,
        row: 1,
      },
      options: this.options
    },
    {
      label: 'label',
      type: CONTROL_TYPE.Label,
      layoutDefine: {
        column: 1,
        row: 1,
      },
    },
    {
      label: 'button',
      type: CONTROL_TYPE.Button,
      layoutDefine: {
        column: 0,
        row: 2,
      },
      onClickFunc: () => {
        this.toastService.addSingle({
          message: "BUTTON.CLICK",
          severity: "success"
        })
      }
    },
    {
      label: 'radio',
      type: CONTROL_TYPE.Radio,
      layoutDefine: {
        column: 1,
        row: 2,
      },
      options: this.options
    },
    {
      label: 'textarea',
      type: CONTROL_TYPE.Textarea,
      layoutDefine: {
        column: 0,
        row: 3,
      },
    },
    {
      label: 'date',
      type: CONTROL_TYPE.Calendar,
      layoutDefine: {
        column: 0,
        row: 4,
      },
    },
    {
      label: 'date multiple',
      type: CONTROL_TYPE.Calendar,
      layoutDefine: {
        column: 1,
        row: 4,
      },
      mode: 'range' // TODO: will shows format invalid format message
    },

  ]

  constructor(
    private translate: TranslateService,
    private toastService: ToastService,
  ) {

  }
}
