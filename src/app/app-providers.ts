import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MessageService } from 'primeng/api';

// Import the UI components and tokens FROM YOUR LIBRARY!
import {
    CONTROL_TYPE,
    BASE_UI_TOKEN,
    BaseButtonComponent,
    BaseInputComponent,
    BaseDropdownComponent,
    FORM_ARRAY_TOKEN,
    FormArrayComponent,
    FormArrayItemComponent,
    BaseCheckboxComponent,
    BaseLabelComponent,
    BaseMultiselectComponent,
    BaseRadioComponent,
    BaseTextareaComponent,
    BaseDatepickerComponent,
    // Import your other components here too! (e.g. BaseDropdownComponent)
} from 'ng-base-lib';

// 1. Create the dictionary mapping the Enum to the actual Component Classes!
export const allBaseUIForm = {
    [CONTROL_TYPE.Textbox]: BaseInputComponent,
    [CONTROL_TYPE.Button]: BaseButtonComponent,
    [CONTROL_TYPE.Dropdown]: BaseDropdownComponent,
    [CONTROL_TYPE.Checkbox]: BaseCheckboxComponent,
    [CONTROL_TYPE.Label]: BaseLabelComponent,
    [CONTROL_TYPE.Multiselect]: BaseMultiselectComponent,
    [CONTROL_TYPE.Radio]: BaseRadioComponent,
    [CONTROL_TYPE.Textarea]: BaseTextareaComponent,
    [CONTROL_TYPE.Calendar]: BaseDatepickerComponent,
};

export const appProviders = [
    // 2. Provide the DICTIONARY to the token, not the Enum!
    { provide: BASE_UI_TOKEN, useValue: allBaseUIForm },
    {
        provide: FORM_ARRAY_TOKEN,
        useValue: {
            [CONTROL_TYPE.FormArray]: FormArrayComponent,
            arrayItem: FormArrayItemComponent,
        },
    },
    // (If you have a FormArrayComponent, map it here, otherwise this might also cause an error later)
    // { provide: FORM_ARRAY_TOKEN, useValue: { [CONTROL_TYPE.FormArray]: MyFormArrayComponent } },

    provideAnimationsAsync(),
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    MessageService,
];