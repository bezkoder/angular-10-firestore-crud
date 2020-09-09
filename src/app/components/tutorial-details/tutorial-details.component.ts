import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import Tutorial from 'src/app/models/tutorial';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit, OnChanges {

  @Input() tutorial: Tutorial;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentTutorial: Tutorial = null;
  message = '';

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentTutorial = { ...this.tutorial };
  }

  updatePublished(status): void {
    this.tutorialService.update(this.currentTutorial.id, { published: status })
      .then(() => {
        this.currentTutorial.published = status;
        this.message = 'The status was updated successfully!';
      })
      .catch(err => console.log(err));
  }

  updateTutorial(): void {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description
    };

    this.tutorialService.update(this.currentTutorial.id, data)
      .then(() => this.message = 'The tutorial was updated successfully!')
      .catch(err => console.log(err));
  }

  deleteTutorial(): void {
    this.tutorialService.delete(this.currentTutorial.id)
      .then(() => {
        this.refreshList.emit();
        this.message = 'The tutorial was updated successfully!';
      })
      .catch(err => console.log(err));
  }

}
