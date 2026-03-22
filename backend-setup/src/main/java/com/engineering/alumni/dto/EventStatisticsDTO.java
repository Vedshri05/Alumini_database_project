package com.engineering.alumni.dto;

import java.util.Map;

public class EventStatisticsDTO {
    private Long totalEvents;
    private Long upcomingEvents;
    private Map<String, Long> eventTypeBreakdown;

    public EventStatisticsDTO() {
    }

    public EventStatisticsDTO(Long totalEvents, Long upcomingEvents, Map<String, Long> eventTypeBreakdown) {
        this.totalEvents = totalEvents;
        this.upcomingEvents = upcomingEvents;
        this.eventTypeBreakdown = eventTypeBreakdown;
    }

    public Long getTotalEvents() {
        return totalEvents;
    }

    public void setTotalEvents(Long totalEvents) {
        this.totalEvents = totalEvents;
    }

    public Long getUpcomingEvents() {
        return upcomingEvents;
    }

    public void setUpcomingEvents(Long upcomingEvents) {
        this.upcomingEvents = upcomingEvents;
    }

    public Map<String, Long> getEventTypeBreakdown() {
        return eventTypeBreakdown;
    }

    public void setEventTypeBreakdown(Map<String, Long> eventTypeBreakdown) {
        this.eventTypeBreakdown = eventTypeBreakdown;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long totalEvents;
        private Long upcomingEvents;
        private Map<String, Long> eventTypeBreakdown;

        public Builder totalEvents(Long totalEvents) {
            this.totalEvents = totalEvents;
            return this;
        }

        public Builder upcomingEvents(Long upcomingEvents) {
            this.upcomingEvents = upcomingEvents;
            return this;
        }

        public Builder eventTypeBreakdown(Map<String, Long> eventTypeBreakdown) {
            this.eventTypeBreakdown = eventTypeBreakdown;
            return this;
        }

        public EventStatisticsDTO build() {
            return new EventStatisticsDTO(totalEvents, upcomingEvents, eventTypeBreakdown);
        }
    }
}
