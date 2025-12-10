export interface ProjectDescription {
    large_image: string;
    h1?: string;
    h2?: string;
    desc?: string;
    desc2?: string;
}

export interface Project {
    project_id: number | string;
    project_title: string;
    coverImg: string;
    project_link: string;
    single_page_page: string;
    category: string;
    featured_image: string;
    tags: string[];
    project_description: ProjectDescription[];
}
