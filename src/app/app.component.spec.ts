import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
// 1. Import the module / 导入模块
import { TranslateModule } from '@ngx-translate/core';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        // 2. Add TranslateModule.forRoot() to the testing imports!
        // 2. 将 TranslateModule.forRoot() 添加到测试的 imports 中！
        TranslateModule.forRoot()
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});