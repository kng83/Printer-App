import { Component, Output, EventEmitter, Input } from '@angular/core';


/** USE EXAMPLE
      <message *ngIf="message" [message]="message" (close)="message=$event"></message>
*/

@Component({
    selector:'message',
    styles:[`
        .modal-look{
        display: block;
        background:rgba(0,0,0,0.5);
    };`],
    template:`
    <div class="modal fade show modal-look" id="exampleModal"  tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <span class="text-white">{{header}}</span>
                    <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close" (click)="onClose()">
                        <span aria-hidden="true" >&times;</span>
                    </button>      
                </div>
                <div class="modal-body  d-flex justify-content-center">
                    <div class="modal-title px-4" id="exampleModalLabel"><ng-content></ng-content></div>
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" (click)="onClose()">Zamknij</button>
                </div>  
            </div>
        </div>
    </div>
    `    
})
export class MessageComponent {
 //  @Input() message:string;
    @Input() header:string = "Wiadomość o zdarzeniu";
    @Output() close = new EventEmitter<boolean>();

    onClose() {
      this.close.emit(false);
    }
}