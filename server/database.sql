-- users table
create table users(
    user_id serial primary key,
    email varchar(255) unique not null,
    password varchar(255) not null,
    created_at date default current_date
);

-- clubs table
create table clubs(
    club_id serial primary key,
    name varchar(255) not null,
    is_active boolean not null,
    is_accepting boolean not null,
    recruiting_cycle varchar(255),
    membership_process varchar(255),
    type varchar(255),
    email varchar(255),
    website varchar(255),
    mission text,
    picture_url varchar(255)
);

-- tracks which clubs each user has saved
CREATE TABLE user_saved_clubs (
    user_id INT NOT NULL,
    club_id INT NOT NULL,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, club_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (club_id) REFERENCES clubs(club_id) ON DELETE CASCADE
);
