import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { BaseButtonComponent, BaseCheckboxComponent, BaseDatepickerComponent, BaseDropdownComponent, BaseFormComponent, BaseInputComponent, BaseLabelComponent, BaseRadioComponent, BaseTextareaComponent, BreadcrumbComponent, ChipComponent, FormArrayComponent, FormArrayItemComponent, FormItemComponent, ToastComponent } from "ng-base-lib";


const components = [
    BaseLabelComponent,
    BaseButtonComponent,
    FormArrayComponent,
    FormArrayItemComponent,
    FormItemComponent,
    BaseFormComponent,
    BaseCheckboxComponent,
    BaseDropdownComponent,
    ChipComponent,
    BaseRadioComponent,
    ToastComponent,
    BaseDatepickerComponent,
    BreadcrumbComponent,
    BaseTextareaComponent,
    BaseInputComponent,
]

export const ComponentImports = [
    components,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
];