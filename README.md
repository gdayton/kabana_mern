# Kanban Board

## Getting Started 

To Run **Kanban Board** locally:

```
docker-compose up
lerna bootstrap
lerna run start
```

Navigate to *http://localhost:3000* in your browser.

## API Documentation

### Create new card - POST /api/card
Request body:
```
{
    title: String, 
    description: String, 
    status: String, 
    story_points: Number
}
```
### Update card - PATCH /api/card
Request body: 
```
{
    title: String, 
    description: String, 
    status: String, 
    story_points: Number
}
```

### Get cards - GET /api/card/:id

### Delete card - DELETE /api/card
Query Params: 
```
id: Number
```

## Planning Documents

#### Backend Objects:

Card
  - id (Integer)
  - title (String)
  - description (String)
  - status (Enum)
  - story_points (Integer)
  - position (Integer) (reach goal)

#### Front end concepts:

Board has 4 columns:
- Ready
- In Progress
- QA 
- Complete

Position on board will be determined by status.

Position vertically will be determined by position (reach goal).

Use tailwind css to handle columns and the drag and drop functionality.

## Retrospective

Ran out of time for the following:
- UI tests
- Nicer formatted cards
- Validation for forms
- Splitting form logic into seperate controllers
- Nicer UI for canceling edit for new cards
- When adding a new card opening a new card below previous instead of creating a blank new one