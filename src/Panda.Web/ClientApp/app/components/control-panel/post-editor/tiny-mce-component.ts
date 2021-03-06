import { Component, OnDestroy, AfterViewInit, EventEmitter, Input, Output, ElementRef, Inject } from '@angular/core';
declare var $: any;

@Component({
    selector: 'tiny-mce',
    template: `<textarea id="{{elementId}}"></textarea>`
})
export class TinyMceComponent implements AfterViewInit, OnDestroy {
    constructor(private _elementRef: ElementRef, @Inject('BASE_URL') private originUrl: string) { }
    @Input() elementId: String;
    @Output() save = new EventEmitter();

    editor: any;

    get content(): string {
        return this.editor.getContent();
    }
    set content(content: string) {
        this.editor.setContent(content);
    }

    ngAfterViewInit() {
        let dialog = $(this._elementRef.nativeElement).closest("md-dialog-container");
        let dialogHeight = dialog.height();
        let dialogPadding = 2 * parseInt(dialog.css("padding"));
        let titleHeight = dialog.find("md-input-container").height();
        let titlePadding = 2 * parseInt(dialog.find("md-input-container").css("padding"));
        var tinyHeight = dialogHeight - dialogPadding - titleHeight - titlePadding - 80;
        tinymce.init({
            selector: '#' + this.elementId,
            height: tinyHeight,
            skin_url: '../tinymce/skins/lightgray',
            plugins: ['image', 'paste', 'code', 'lists', 'link', 'save'],
            automatic_uploads: true,
            images_upload_url: `${this.originUrl}api/upload/`,
            paste_data_images: true,
            setup: (editor: any) => {
                this.editor = editor;
            },
            save_onsavecallback: ()=>{
                this.save.emit('Post Saved!');
            }
        });
    }

    ngOnDestroy() {
        tinymce.remove(this.editor);
    }
}