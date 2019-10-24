import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Note } from "./idea.model";
import { Subject } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { HttpClient } from "@angular/common/http";
import { ErrorComponent } from "src/app/error/error.component";
import { map } from "rxjs/operators";

@Injectable({ providedIn: 'root' })

export class IdeaService {

    private notes: Array<Note> = [];
    private notesListener = new Subject<Array<Note>>();

    constructor(private dialog: MatDialog, private authService: AuthService, private httpClient: HttpClient) {

    }

    addNote(title: string, description: string, color: string) {

        const userId = this.authService.getCurrentUserId();

        let data = {
            title,
            description,
            color,
            userId
        };

        type responseType = { status: string, note: any };

        this.httpClient.post<responseType>("http://localhost:3000/note", data)
            .subscribe(
                (data) => {
                    this.getNotes();
                },
                (error) => {
                    this.dialog.open(ErrorComponent, {
                        data: {
                            message: error.error.error.message
                        }
                    });
                }
            );
    }

    getNotes() {

        type responseType = { status: string, notes: any };

        this.httpClient.get<responseType>("http://localhost:3000/note")
            .pipe(
                map(
                    (data) => {
                        return data.notes.map(
                            (note) => {
                                return {
                                    id: note._id,
                                    title: note.title,
                                    description: note.description,
                                    color: note.color,
                                    userId: note.userId,
                                    createdAt: note.createdAt
                                }
                            }
                        )
                    }
                )
            )
            .subscribe(
                (transformedData: Array<Note>) => {
                    this.notes = transformedData;
                    this.notesListener.next([...this.notes]);
                },
                (error) => {
                    this.dialog.open(ErrorComponent, {
                        data: {
                            message: error.error.error.message
                        }
                    });
                }
            );
    }

    getStaticNotes() {
        return this.notes;
    }

    getNotesListener() {
        return this.notesListener.asObservable();
    }

    deleteNote(id: string) {

        type responseType = { status: string, note: any };

        this.httpClient.delete<responseType>("http://localhost:3000/note/" + id)
            .subscribe(
                (data) => {
                    console.log(data.status);
                    this.getNotes();
                },
                (error) => {
                    this.dialog.open(ErrorComponent, {
                        data: {
                            message: error.error.error.message
                        }
                    });
                }
            );
    }
}