///////////////////////////////////////
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export interface Profile {
  name: string;
  title: string;
  about: string;
  profileImageUrl: string;
  socialLinks: { [key: string]: string };
}
export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}
export interface Experiences {
  id: number;
  Title: string;
  Description: string[];
}

//---------------------------------------------------------------------
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  private API_BASE_URL = 'https://localhost:7170/api';
  title = 'reham-abass-profile-angular';
  profile: Profile | null = null;
  experiences: any[] = [];//Experiences[] = [];
  skills: string[] = [];
  projects: Project[] = [];
  loading: boolean = true;
  error: string | null = null;
  currentYear: number = new Date().getFullYear();
  //---------------------------------------------------------------------
  constructor(private http: HttpClient) { }
  //---------------------------------------------------------------------
  ngOnInit(): void {
    console.log("hi reham - from ngOninit().. ");
    this.fetchProfileData();
    this.fetchExperiencesData();
    this.fetchSkillsData();
    this.fetchProjectsData();
  }
  //---------------------------------------------------------------------
  private fetchProfileData(): void {
    // Using HttpClient to fetch data from your .NET API endpoint
    this.http.get<Profile>(`${this.API_BASE_URL}/Profile`).subscribe({
      next: (data) => {
        console.log("reham - fetchProfileData() , data = ", data);
        this.profile = data;
        this.checkAllDataLoaded();
      },
      error: (err) => {
        this.error = 'Failed to load profile data.';
        console.error('Error fetching profile:', err);
        this.loading = false; // Stop loading even if one fails
      }
    });
  }
  //---------------------------------------------------------------------
  downloadPdf(filename: string): void {
    const pdfPath = `assets/${filename}`;
    // Open the PDF in a new tab. This typically triggers a download for PDF files,
    // or opens it in the browser's built-in PDF viewer, from where the user can save it.
    window.open(pdfPath, '_blank');
  }
  //---------------------------------------------------------------------
  private fetchExperiencesData(): void {
    this.http.get<string[]>(`${this.API_BASE_URL}/Experiences`).subscribe({
      next: (data) => {
        console.log("reham - experiences data = ", data);
        this.experiences = data;
        this.checkAllDataLoaded();
      },
      error: (err) => {
        this.error = 'Failed to load experiences data.';
        console.error('Error fetching experiences : ', err);
        this.loading = false;
      }
    });
  }

  //---------------------------------------------------------------------
  private fetchSkillsData(): void {
    this.http.get<string[]>(`${this.API_BASE_URL}/Skills`).subscribe({
      next: (data) => {
        this.skills = data;
        this.checkAllDataLoaded();
      },
      error: (err) => {
        this.error = 'Failed to load skills data.';
        console.error('Error fetching skills:', err);
        this.loading = false;
      }
    });
  }

  //---------------------------------------------------------------------
  private fetchProjectsData(): void {
    // Using HttpClient to fetch data from your .NET API endpoint
    this.http.get<Project[]>(`${this.API_BASE_URL}/Projects`).subscribe({
      next: (data) => {
        this.projects = data;
        this.checkAllDataLoaded();
      },
      error: (err) => {
        this.error = 'Failed to load projects data.';
        console.error('Error fetching projects:', err);
        this.loading = false;
      }
    });
  }

  //---------------------------------------------------------------------
  private checkAllDataLoaded(): void {
    // Only set loading to false when all three data sets have been fetched.
    if (this.profile && this.skills.length > 0 && this.projects.length > 0) {
      this.loading = false;
    }
  }

  //---------------------------------------------------------------------
  onImageError(event: Event, type: 'profile' | 'project'): void {
    const imgElement = event.target as HTMLImageElement;
    if (type === 'profile') {
      imgElement.src = "https://placehold.co/400x400/cccccc/333333?text=Image+Not+Found";
    } else if (type === 'project') {
      imgElement.src = "https://placehold.co/600x400/e0e0e0/333333?text=Project+Image";
    }
  }

  //---------------------------------------------------------------------
}
