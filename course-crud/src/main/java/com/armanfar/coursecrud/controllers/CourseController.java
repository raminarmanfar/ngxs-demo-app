package com.armanfar.coursecrud.controllers;

import com.armanfar.coursecrud.models.Course;
import com.armanfar.coursecrud.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @GetMapping(path = "/courses")
    @ResponseBody
    public List<Course> findAll() {
        return courseService.findAll();
    }

    @PostMapping(path = "/courses")
    @ResponseBody
    public Course addNewCourse(@RequestBody() Course course) {
        return courseService.addNewCourse(course);
    }

    @PutMapping(path = "/courses/{id}")
    @ResponseBody
    public Course updateCourse(
            @PathVariable() Long id,
            @RequestBody() Course course) {
        return courseService.updateCourse(id, course);
    }

    @DeleteMapping(path = "/courses/{id}")
    @ResponseBody
    public void deleteCourseById(@PathVariable("id") Long id) {
        courseService.deleteCourseById(id);
    }
}
