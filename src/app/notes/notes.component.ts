import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  mobileQuery: MediaQueryList;
  opened: boolean = true;
  notes = [{value: 'New Note', selected: false}, {value: 'Recent Note', selected: false}, {value: 'Recent 1 Note', selected: false}];

  selected = {value: 'New Notes', selected: true};

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.opened = !media.matchMedia('(max-width: 600px)').matches;
    console.log('mobile width', media.matchMedia('(max-width: 600px)').matches);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  create() {
    // if(this.notes.find((note)=>{
    //   if(note.value == "New Note"){
    //     return true;
    //   }
    // })) {

    // }
    this.notes.unshift({value: 'New Note', selected: false});
    this.selected = this.notes[0];
  }

  updateModel(note) {
    this.selected = { value: note.value, selected: true };
  }

  edit(note) {
    this.selected = note;
  }

  delete(note) {
    console.log('delete', note);
  }

  ngOnInit() {
    this.notes = JSON.parse(localStorage.getItem('notesData'));
    if(!this.notes) {
      this.notes = [{value: 'New Notes', selected: true}];
      this.selected = this.notes[0];
    }
  }

  saveData() {
    localStorage.setItem(JSON.stringify(this.notes), 'notesData');
  }

}
