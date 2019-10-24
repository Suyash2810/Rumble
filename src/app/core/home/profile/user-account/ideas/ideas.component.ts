import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IdeaService } from './idea.service';
import { Subscription } from 'rxjs';
import { Note } from './idea.model';

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.css']
})
export class IdeasComponent implements OnInit, OnDestroy {

  @ViewChild('f') form: NgForm;
  notes: Array<Note> = [];
  notesSub: Subscription;

  colors: Array<{ key: string, value: string }> = [
    {
      key: 'Caribbean Green',
      value: '#00BFA5'
    },
    {
      key: 'Vivid Cyan',
      value: '#00B8D4'
    },
    {
      key: 'Dodger Blue',
      value: '#0091EA'
    },
    {
      key: 'Mosqe',
      value: '#006064'
    },
    {
      key: 'Limeade',
      value: '#01579B'
    },
    {
      key: 'Medium Turquoise',
      value: '#4DD0E1'
    },
    {
      key: 'Cobalt',
      value: '#0D47A1'
    }
  ]
  constructor(private noteService: IdeaService) { }

  ngOnInit() {
    this.noteService.getNotes();
    this.notes = this.noteService.getStaticNotes();
    this.notesSub = this.noteService.getNotesListener().subscribe(
      (notes: Array<Note>) => {
        this.notes = notes;
      }
    )
  }

  onSubmit() {
    this.noteService.addNote(this.form.value.title, this.form.value.description, this.form.value.noteColor);
    this.form.reset();
  }

  ngOnDestroy() {
    this.notesSub.unsubscribe();
  }
}
